export const locale = {
  'en-US': 'en-US',
  'es-ES': 'es-ES',
  'fr-FR': 'fr-FR',
} as const

export const locales = Object.values(locale)

export type Locale = (typeof locale)[keyof typeof locale]

export function isLocaleValid(value?: string | null): value is Locale {
  if (!value)
    return false
  return locales.includes(value as any)
}
