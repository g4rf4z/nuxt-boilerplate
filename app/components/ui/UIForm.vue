<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'
import type { AnyZodObject, ZodEffects } from 'zod'

interface Props {
  schema: AnyZodObject | ZodEffects<AnyZodObject>
  data: Record<string, unknown>
  onSubmit: (data: Record<string, unknown>) => Promise<void>
  onError?: (context: { error: unknown, errors: FormError[] }) => void
}

interface Exposed {
  readonly isLoading: Ref<boolean>
  submit: () => Promise<void>
  validate: () => Promise<Record<string, unknown>>
  clear: () => void
  setErrors: (errors: FormError[]) => void
}

const props = defineProps<Props>()

const formRef = ref()
const isLoading = ref(false)

async function _handleSubmit(event: FormSubmitEvent<Record<string, any>>): Promise<void> {
  if (isLoading.value)
    return

  try {
    isLoading.value = true
    await props.onSubmit(event.data)
  }
  catch (error) {
    _handleError(error, [])
  }
  finally {
    isLoading.value = false
  }
}

function _handleError(error: unknown, errors: FormError[] = []): void {
  if (props.onError) {
    props.onError({ error, errors })
  }
}

async function submit(): Promise<void> {
  await formRef.value?.submit()
}

async function validate(): Promise<Record<string, unknown>> {
  return await formRef.value?.validate()
}

function clear(): void {
  formRef.value?.clear()
}

function setErrors(errors: FormError[]): void {
  formRef.value?.setErrors(errors)
}

defineExpose<Exposed>({
  isLoading: computed(() => isLoading.value),
  submit,
  validate,
  clear,
  setErrors,
})
</script>

<template>
  <UForm
    ref="formRef"
    :schema="schema"
    :state="data"
    class="space-y-4"
    @submit="_handleSubmit"
    @error="_handleError"
  >
    <slot />
  </UForm>
</template>
