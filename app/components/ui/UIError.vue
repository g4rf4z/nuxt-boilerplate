<script setup lang="ts">
interface Props {
  error?: string | boolean
}

defineProps<Props>()
const { tg, tge } = useTranslation()
</script>

<template>
  <span v-if="error && typeof error !== 'boolean'" class="text-red-500 dark:text-red-400">
    {{ tge(error) ? tg(error) : error }}
  </span>
</template>
