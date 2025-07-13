<script setup lang="ts">
import type { ButtonColor, ButtonSize, ButtonType, ButtonVariant } from '~/types'

interface Props {
  label?: string
  icon?: string
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
  loading?: boolean
  trailing?: boolean
  block?: boolean
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'solid',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  trailing: false,
  block: false,
})
</script>

<template>
  <UButton
    :label="label"
    :icon="icon"
    :color="color"
    :variant="variant"
    :size="size"
    :type="type"
    :disabled="disabled"
    :loading="loading"
    :trailing="trailing"
    :block="block"
    :square="label ? false : true"
  />
</template>
