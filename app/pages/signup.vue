<script setup lang="ts">
definePageMeta({
  name: 'SIGNUP',
  middleware: ['guest'],
  layout: 'public',
})
</script>

<template>
  <Signup class="mt-10 mb-10 md:mb-auto" />
</template>
