<script setup lang="ts">
const appConfig = useAppConfig()
const i18nHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
    dir: i18nHead.value.htmlAttrs?.dir as 'ltr' | 'rtl',
  },
  link: i18nHead.value.link || [],
  meta: i18nHead.value.meta || [],
}))
</script>

<template>
  <UApp :toaster="appConfig.toaster" :tooltip="appConfig.tooltip">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
