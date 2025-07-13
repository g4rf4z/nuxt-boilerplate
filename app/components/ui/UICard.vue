<script setup lang="ts">
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'

interface Props {
  as?: 'div' | 'ULink'
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  headerClass?: string
  bodyClass?: string
  footerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
})

const headerClass = computed(() => {
  if (props.headerClass)
    return props.headerClass
  return 'flex flex-row items-center justify-between'
})

const bodyClass = computed(() => {
  if (props.bodyClass)
    return props.bodyClass
  return 'flex flex-col gap-4'
})

const footerClass = computed(() => {
  if (props.footerClass)
    return props.footerClass
  return 'flex justify-end gap-2'
})
</script>

<template>
  <UCard :as="as" :to="to" :ui="{ header: headerClass, body: bodyClass, footer: footerClass }">
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <slot />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>
