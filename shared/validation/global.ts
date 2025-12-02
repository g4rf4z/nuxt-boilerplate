import type { TypeOf, ZodObject } from 'zod'

export function constObjectToArray<T extends Record<string, string>>(obj: T): Array<T[keyof T]> {
  return Object.values(obj) as Array<T[keyof T]>
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
