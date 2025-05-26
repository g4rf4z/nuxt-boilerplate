// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    // '@nuxtjs/i18n',
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
  },

  eslint: {
    config: {
      standalone: false,
      stylistic: true,
    },
  },

  // i18n: {
  //   defaultLocale: 'fr-FR',
  //   locales: [{
  //     code: 'en-US',
  //     name: 'English (United States)',
  //     files: [
  //       'en-US/common.ts',
  //       'en-US/enums.ts',
  //       'en-US/validation.ts',
  //     ],
  //   }, {
  //     code: 'fr-FR',
  //     name: 'Français (France)',
  //     files: [
  //       'fr-FR/common.ts',
  //       'fr-FR/enums.ts',
  //       'fr-FR/validation.ts',
  //     ],
  //   }],
  //   langDir: 'locales',
  // },
})
