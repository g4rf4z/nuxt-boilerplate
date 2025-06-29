import { object, string, enum as zodEnum } from 'zod'
import { locale } from '~~/shared/types/locale'
import { getValues, withPasswordValidation } from '~~/shared/validation/global'

const _userSchema = object({
  locale: zodEnum(getValues(locale), {
    errorMap: () => ({ message: 'VALIDATION.LOCALE.INVALID' }),
  }),
  email: string()
    .trim()
    .toLowerCase()
    .email({ message: 'VALIDATION.USER.EMAIL.INVALID' }),
  password: string()
    .min(8, { message: 'VALIDATION.USER.PASSWORD.MIN' })
    .max(25, { message: 'VALIDATION.USER.PASSWORD.MAX' }),
  passwordConfirmation: string(),
}).strict()

export const authSignupSchema = withPasswordValidation(_userSchema.pick({
  locale: true,
  email: true,
  password: true,
  passwordConfirmation: true,
}), 'password', 'passwordConfirmation')

export const authSigninSchema = object({
  email: _userSchema.shape.email,
  password: string(),
}).strict()

export const authUpdatePasswordSchema = withPasswordValidation(object({
  currentPassword: string(),
  newPassword: _userSchema.shape.password,
  newPasswordConfirmation: _userSchema.shape.passwordConfirmation,
}), 'newPassword', 'newPasswordConfirmation')

export const authResetPasswordSchema = object({
  email: _userSchema.shape.email,
}).strict()

export const authSetPasswordSchema = withPasswordValidation(object({
  email: _userSchema.shape.email,
  password: _userSchema.shape.password,
  passwordConfirmation: _userSchema.shape.passwordConfirmation,
  token: string().min(64, { message: 'VALIDATION.USER.TOKEN.MIN' }).max(64, { message: 'VALIDATION.USER.TOKEN.MAX' }),
}).strict(), 'password', 'passwordConfirmation')
