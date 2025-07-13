<script setup lang="ts">
import type { FormFieldSize } from '~/types'

interface Props {
  label?: string
  name?: string
  optional?: boolean
  customError?: string
  size?: FormFieldSize
}

withDefaults(defineProps<Props>(), {
  optional: false,
  size: 'md',
})

const { t } = useTranslation()
</script>

<template>
  <UFormField
    :label="label"
    :name="name"
    :error="customError"
    :size="size"
    :ui="{
      root: 'w-full max-w-full',
      wrapper: 'w-full max-w-full',
    }"
  >
    <template #hint>
      <slot name="hint" />
      <span v-if="optional">{{ t('OPTIONAL') }}</span>
    </template>

    <slot />

    <template #error="{ error }">
      <UIError :error="error" />
    </template>
  </UFormField>
</template>

<i18n lang="json">
{
  "en-US": {
    "OPTIONAL": "Optional"
  },
  "es-ES": {
    "OPTIONAL": "Opcional"
  },
  "fr-FR": {
    "OPTIONAL": "Optionnel"
  }
}
</i18n>
