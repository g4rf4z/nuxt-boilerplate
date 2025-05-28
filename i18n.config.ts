import type { LocaleObject, ModuleOptions as NuxtI18nOptions } from '@nuxtjs/i18n'

export const locales = [
  {
    name: 'English (United States)',
    code: 'en-US',
    language: 'en-US',
    dir: 'ltr',
  },
  {
    name: 'Español (España)',
    code: 'es-ES',
    language: 'es-ES',
    dir: 'ltr',
  },
  {
    name: 'Français (France)',
    code: 'fr-FR',
    language: 'fr-FR',
    dir: 'ltr',
  },
] as const satisfies LocaleObject<string>[]

function _generateLocales(files: string[]): LocaleObject<string>[] {
  return locales.map(
    locale => ({
      ...locale,
      files: files.map(file => `${locale.code}/${file}`),
    }
    ),
  )
}

export function generateI18nConfig(files: string[]): NuxtI18nOptions {
  return {
    baseUrl: import.meta.env.CLIENT_URI,
    defaultLocale: 'en-US',
    strategy: 'prefix_except_default',

    locales: _generateLocales(files),

    lazy: true,
    langDir: 'locales',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'nuxt-lang',
      cookieSecure: true,
      redirectOn: 'root',
      fallbackLocale: 'en-US',
    },

    bundle: {
      optimizeTranslationDirective: false,
    },
  } satisfies NuxtI18nOptions
}
