import { sessions } from '../../database/schema/session'

export default defineEventHandler(async (event) => {
  try {
    const db = useDrizzle()
    const session = await getUserSession(event)

    if (!session.id) {
      throw createError({
        message: 'No session was found.',
        statusCode: 404,
      })
    }

    const sessionId = Number.parseInt(session.id)

    await Promise.all([
      clearUserSession(event),
      db.update(sessions)
        .set({ isActive: false })
        .where(eq(sessions.id, sessionId))
        .returning({
          id: sessions.id,
          createdAt: sessions.createdAt,
          updatedAt: sessions.updatedAt,
          isActive: sessions.isActive,
          provider: sessions.provider,
          userAgent: sessions.userAgent,
          userId: sessions.userId,
        }),
    ])

    return { message: 'Signed out successfully' }
  }
  catch (e) {
    console.error(e)
    throw e
  }
})
