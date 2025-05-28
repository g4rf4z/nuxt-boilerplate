import { generateI18nConfig } from './i18n.config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    'nuxt-viewport',
    '@nuxthub/core',
  ],

  devtools: {
    enabled: true,
  },

  css: [
    '~/assets/css/main.css',
  ],

  runtimeConfig: {
    public: {
      api: '/api',
    },
    clientUri: import.meta.env.CLIENT_URI,
  },

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-11-01',

  nitro: {
    experimental: {
      tasks: true,
    },
  },

  hub: {
    database: true,
    workers: true,
  },

  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },

  i18n: generateI18nConfig([
    'theme.ts',
  ]),
})
