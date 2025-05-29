export function useTranslation(pathPrefix?: string) {
  const { t, te } = useI18n({ useScope: 'local' })
  const { t: tg, te: tge, locale, locales, setLocale } = useI18n({ useScope: 'global' })

  const customT = (key: string, countOrVariables: number | Record<string, unknown> = {}, count?: number) => {
    if (typeof countOrVariables === 'number') {
      return t(`${pathPrefix ? `${pathPrefix}.` : ''}${key}`, countOrVariables)
    }
    else {
      return t(`${pathPrefix ? `${pathPrefix}.` : ''}${key}`, countOrVariables, count ?? 1)
    }
  }

  const customTg = (key: string, countOrVariables: number | Record<string, unknown> = {}, count?: number) => {
    if (typeof countOrVariables === 'number') {
      return tg(`${pathPrefix ? `${pathPrefix}.` : ''}${key}`, countOrVariables)
    }
    else {
      return tg(`${pathPrefix ? `${pathPrefix}.` : ''}${key}`, countOrVariables, count ?? 1)
    }
  }

  const customTe = (key: string) => te(`${pathPrefix ? `${pathPrefix}.` : ''}${key}`)
  const customTge = (key: string) => tge(`${pathPrefix ? `${pathPrefix}.` : ''}${key}`)

  const getLocaleName = (code: string): string | undefined => locales.value.find(l => l.code === code)?.name

  return {
    t: customT,
    tg: customTg,
    te: customTe,
    tge: customTge,
    locale,
    locales,
    setLocale,
    getLocaleName,
  }
}
