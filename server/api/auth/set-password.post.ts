import { resetPasswordTokens } from '~~/server/database/schema/resetPasswordToken'
import { users } from '~~/server/database/schema/user'
import { CryptoService } from '~~/server/services/crypto.service'
import { authSetPasswordSchema } from '~~/shared/validation/user'

export default defineEventHandler(async (event) => {
  try {
    const {
      token,
      email,
      password,
    } = await readValidatedBody(event, authSetPasswordSchema.parse)

    const foundToken = await useDrizzle()
      .select({
        id: resetPasswordTokens.id,
        tokenHash: resetPasswordTokens.tokenHash,
        expiresAt: resetPasswordTokens.expiresAt,
        expired: resetPasswordTokens.expired,
        userId: resetPasswordTokens.userId,
      })
      .from(resetPasswordTokens)
      .innerJoin(users, eq(resetPasswordTokens.userId, users.id))
      .where(
        and(
          eq(users.email, email),
          gte(resetPasswordTokens.expiresAt, new Date().toISOString()),
          eq(resetPasswordTokens.expired, false),
        ),
      )
      .get()

    if (!foundToken) {
      throw createError({
        message: 'Invalid token',
        statusCode: 401,
      })
    }

    const cryptoService = new CryptoService()
    const isTokenValid = await cryptoService.compare(token, foundToken.tokenHash)

    if (!isTokenValid) {
      throw createError({
        message: 'Invalid token',
        statusCode: 401,
      })
    }

    const passwordHash = await hashPassword(password)

    // update the pw in db
    await useDrizzle().update(users).set({
      password: passwordHash,
    }).where(eq(users.id, foundToken.userId))

    // expire the token in the db
    await useDrizzle().update(resetPasswordTokens).set({
      expired: true,
    }).where(eq(resetPasswordTokens.id, foundToken.id))

    return setResponseStatus(event, 204)
  }

  catch (e) {
    console.error(e)
    throw e
  }
})
