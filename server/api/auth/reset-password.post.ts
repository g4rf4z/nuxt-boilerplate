// import { resetPasswordTokens } from '~~/server/database/schema/resetPasswordToken'
// import { users } from '~~/server/database/schema/user'
// import { CryptoService } from '~~/server/services/crypto.service'
// import { EmailService } from '~~/server/services/email.service'
// import { authResetPasswordSchema } from '~~/shared/validation/user'

// export default defineEventHandler(async (event) => {
//   try {
//     const { email } = await readValidatedBody(event, authResetPasswordSchema.parse)

//     const rawLocale = getCookie(event, 'i18n_redirected')
//     const locale: Locale = isLocaleValid(rawLocale) ? rawLocale : 'fr-FR'

//     const _user = await useDrizzle()
//       .select({
//         id: users.id,
//       })
//       .from(users)
//       .where(eq(users.email, email))
//       .get()

//     if (!_user) {
//       return setResponseStatus(event, 204)
//     }

//     const cryptoService = new CryptoService()
//     const token = cryptoService.generateRandomString(32)
//     const tokenHash = await cryptoService.hash(token)

//     const expiresAt = new Date()
//     expiresAt.setMinutes(expiresAt.getMinutes() + 5)

//     const _resetPasswordToken = await useDrizzle().insert(resetPasswordTokens).values({
//       tokenHash,
//       expiresAt: expiresAt.toISOString(),
//       userId: _user.id,
//     }).returning().get()

//     await useDrizzle()
//       .update(resetPasswordTokens)
//       .set({
//         expired: true,
//       })
//       .where(
//         and(
//           eq(resetPasswordTokens.userId, _user.id),
//           ne(resetPasswordTokens.id, _resetPasswordToken.id),
//         ),
//       )

//     const emailService = new EmailService()
//     const { error } = await emailService.sendResetPasswordEmail(email, token, locale)

//     if (error) {
//       throw error
//     }

//     return setResponseStatus(event, 201)
//   }
//   catch (e) {
//     console.error(e)
//     throw e
//   }
// })
