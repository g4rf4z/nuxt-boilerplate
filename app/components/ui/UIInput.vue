<script setup lang="ts">
import type { InputSize, InputType } from '~/types'

interface Props {
  label?: string
  name?: string
  optional?: boolean
  placeholder?: string
  icon?: string
  type?: InputType
  size?: InputSize
  disabled?: boolean
  loading?: boolean
  trailing?: boolean
  ignorePasswordManager?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  optional: false,
  type: 'text',
  size: 'md',
  disabled: false,
  loading: false,
  trailing: false,
  ignorePasswordManager: false,
})

const inputValue = defineModel<string | number | undefined>('modelValue', { required: true })

const passwordManagerAttributes = computed(() => {
  if (props.ignorePasswordManager) {
    return {
      'autocomplete': 'off',
      'data-form-type': 'other',
      // 1Password
      'data-1p-ignore': true,
      // LastPass
      'data-lpignore': true,
      // Bitwarden
      'data-bwignore': true,
      // ProtonPass
      'data-protonpass-ignore': true,
    }
  }

  return {}
})
</script>

<template>
  <UIFormField
    :label="label"
    :name="name"
    :optional="optional"
    :size="size"
  >
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>

    <UInput
      v-bind="passwordManagerAttributes"
      v-model="inputValue"
      :placeholder="placeholder"
      :icon="icon"
      :type="type"
      :size="size"
      :disabled="disabled"
      :loading="loading"
      :trailing="trailing"
      :ui="{
        root: 'w-full max-w-full',
      }"
    />
  </UIFormField>
</template>
