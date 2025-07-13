<script setup lang="ts">
import type { AnyZodObject, ZodEffects } from 'zod'

interface Props {
  schema: AnyZodObject | ZodEffects<AnyZodObject> | ZodEffects<ZodEffects<AnyZodObject>>
  data: Record<string, unknown>
  onSubmit: (data: Record<string, unknown>) => Promise<void>
  onSubmitError?: ({ error, formRef }: { error: unknown, formRef: any }) => void
  onReset?: () => void
}

const props = defineProps<Props>()
const nuxtApp = useNuxtApp()

const { registerFormValidation, unregisterFormValidation, validateAllForms } = useForm()
const id = useId()
const formRef = useTemplateRef('formRef')

const isLoading = useState<string[]>('UIForm.submitLoading', (): string[] => [])
const isFormLoading = computed(() => isLoading.value.includes(id))

const { formatApiError } = useApiError()

registerFormValidation(id, async () => {
  try {
    await formRef.value?.validate()
    return true
  }
  catch {
    return false
  }
})

async function safeSubmit(data: Record<string, unknown>) {
  try {
    isLoading.value.push(id)
    await props.onSubmit(data)
    removeItemFromArray(isLoading.value, id)
  }
  catch (error) {
    console.error(error)
    formatApiError(error, formRef.value || undefined)
    removeItemFromArray(isLoading.value, id)
  }
}

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

onUnmounted(() => {
  isMounted.value = false
  unregisterFormValidation(id)
})

nuxtApp.hook('form:reset', () => {
  if (!isMounted.value)
    return
  if (props.onReset)
    props.onReset()
  formRef?.value?.clear()
})

nuxtApp.hook('form:submit', async () => {
  if (!isMounted.value)
    return

  // TODO: Improve this so the validation of all the form won't be done from every form (because atm, if we have multiple UIForm components mounted, the validation will be done from every form)
  const allValid = await validateAllForms()
  if (allValid) {
    safeSubmit(props.data)
  }
})

function submit() {
  safeSubmit(props.data)
}

defineExpose({
  isLoading: isFormLoading,
  submit,
  formRef,
})
</script>

<template>
  <UForm ref="formRef" :schema="schema" :state="data" class="space-y-4" @submit="submit">
    <slot />
    <UIButton
      type="submit"
      class="hidden"
    />
  </UForm>
</template>
