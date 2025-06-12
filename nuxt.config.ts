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
    '@nuxthub/core',
    '@pinia/colada-nuxt',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    'nuxt-viewport',
  ],

  imports: {
    dirs: [
      './store',
    ],
  },

  devtools: {
    enabled: true,
  },

  css: [
    '~/assets/css/main.css',
  ],

  colorMode: {
    classSuffix: '',
    storage: 'cookie',
  },

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
    clientUrl: import.meta.env.CLIENT_URL,
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
