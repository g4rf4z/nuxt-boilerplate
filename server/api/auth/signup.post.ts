import { isLocaleValid } from '~~/shared/types/locale.type'
import { authSignupSchema } from '~~/shared/validation/user'
import { users } from '../../database/schema/user'

export default defineEventHandler(async (event) => {
  try {
    const db = useDrizzle()
    const {
      email,
      password,
    } = await readValidatedBody(event, authSignupSchema.parse)

    const rawLocale = getCookie(event, 'i18n_redirected')
    const locale: Locale = isLocaleValid(rawLocale) ? rawLocale : 'fr-FR'

    const hashedPassword = await hashPassword(password)

    const [user] = await db.insert(users)
      .values({
        locale,
        email,
        password: hashedPassword,
        isActive: false,
        isVerified: false,
      })
      .onConflictDoNothing()
      .returning({
        id: users.id,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        firstname: users.firstname,
        lastname: users.lastname,
        locale: users.locale,
        email: users.email,
        isActive: users.isActive,
        isVerified: users.isVerified,
      })

    if (!user) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Email already exists',
      })
    }

    await initializeUserData(user.id)

    return { user }
  }
  catch (e) {
    console.error(e)
    throw e
  }
})
