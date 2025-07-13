import { authSigninSchema } from '~~/shared/validation/user'
import { sessions } from '../../database/schema/session'
import { users } from '../../database/schema/user'

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readValidatedBody(event, authSigninSchema.parse)

    const db = useDrizzle()
    const [user] = await db.select({
      id: users.id,
      locale: users.locale,
      email: users.email,
      password: users.password,
      isActive: users.isActive,
    }).from(users).where(eq(users.email, email)).limit(1)

    const invalidCredentialsError = createError({
      message: 'Invalid credentials',
      statusCode: 401,
    })

    if (!user)
      throw invalidCredentialsError

    const isPasswordValid = await verifyPassword(user.password || '', password)
    if (!isPasswordValid)
      throw invalidCredentialsError

    if (!user.isActive) {
      throw createError({
        message: 'User is not active.',
        statusCode: 403,
      })
    }

    const userAgent = event.node.req.headers['user-agent']
      || 'Unknown User-Agent'

    const [session] = await db.insert(sessions)
      .values({
        isActive: true,
        provider: 'local',
        userAgent,
        userId: user.id,
      })
      .returning({
        id: sessions.id,
        createdAt: sessions.createdAt,
        updatedAt: sessions.updatedAt,
        isActive: sessions.isActive,
        provider: sessions.provider,
        userAgent: sessions.userAgent,
        userId: sessions.userId,
      })

    const userSession = await setUserSession(event, {
      id: session.id,
      user: {
        id: user.id,
        email: user.email,
        locale: user.locale,
      },
    })

    await db.update(sessions)
      .set({ isActive: false })
      .where(and(eq(sessions.userId, user.id), ne(sessions.id, session.id)))

    return { userSession }
  }
  catch (e) {
    console.error(e)
    throw e
  }
})
