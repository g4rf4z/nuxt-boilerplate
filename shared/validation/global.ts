import type { TypeOf, ZodObject } from 'zod'

export function getValues<T extends Record<string, any>>(obj: T) {
  return Object.values(obj) as [(typeof obj)[keyof T]]
}

export function withPasswordValidation<T extends ZodObject<any>>(
  schema: T,
  passwordField: string,
  confirmationField: string,
) {
  return schema
    .refine((data: TypeOf<T>) => validatePasswordComplexity(data[passwordField], 3), {
      message: 'VALIDATION.USER.PASSWORD.COMPLEXITY',
      path: [passwordField],
    })
    .refine((data: TypeOf<T>) => data[passwordField] === data[confirmationField], {
      message: 'VALIDATION.USER.PASSWORD.MATCH',
      path: [confirmationField],
    })
}
