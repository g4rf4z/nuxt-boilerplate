<script setup lang="ts">
const { isDark, toggleDark } = useTheme()
const { tg } = useTranslation()

const getIcon = computed(() => isDark.value ? 'i-lucide-moon' : 'i-lucide-sun')
const getLabel = computed(() => isDark.value ? tg('TOGGLE_TO_LIGHT') : tg('TOGGLE_TO_DARK'))
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    size="xl"
    :aria-label="getLabel"
    :icon="getIcon"
    square
    @click="toggleDark"
  />
</template>

<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 9999;
}
.dark::view-transition-old(root) {
  z-index: 9999;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
