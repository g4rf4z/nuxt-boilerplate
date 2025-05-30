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

  ui: {
    theme: {
      colors: [
        'primary',
        'info',
        'success',
        'warning',
        'error',
      ],
    },
  },

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

  viewport: {
    breakpoints: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
    },
    defaultBreakpoints: {
      desktop: 'lg',
      tablet: 'md',
      mobile: 'xs',
    },
    fallbackBreakpoint: 'lg',
  },
})
