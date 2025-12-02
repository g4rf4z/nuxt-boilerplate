export function validatePasswordComplexity(
  password: string | undefined,
  passwordComplexity: number,
): boolean {
  if (!password)
    return true

  const checks = [
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\W/.test(password),
    /\d/.test(password),
  ]

  return checks.filter(Boolean).length >= passwordComplexity
}
