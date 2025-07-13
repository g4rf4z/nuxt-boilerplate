<script setup lang="ts">
interface Props {
  title: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <UICard class="w-full max-w-md mx-auto">
    <div class="flex flex-col gap-2">
      <p class="title">
        {{ title }}
      </p>
      <p v-if="$slots.description || description" class="body-lg text-gray-500 dark:text-gray-400">
        <slot name="description">
          {{ description }}
        </slot>
      </p>
    </div>
    <slot />
  </UICard>
</template>
