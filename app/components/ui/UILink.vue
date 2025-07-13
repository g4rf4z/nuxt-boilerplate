<script setup lang="ts">
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router'
import type { LinkColor, LinkVariant } from '~/types'

interface Props {
  to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric
  color?: LinkColor | null
  variant?: LinkVariant
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'link',
})
</script>

<template>
  <ULink
    :to="to"
    :inactive-class="color ? `text-${color} hover:underline` : ''"
    :active-class="color ? `text-${color} hover:underline` : ''"
  >
    <slot />
  </ULink>
</template>
