<template>
  <div class="fixed inset-0 flex flex-col">
    <LayoutHeaderPublic />
    <div class="flex flex-col flex-1 overflow-y-auto">
      <main class="flex flex-col flex-1 gap-4 px-3 pt-4 pb-10 md:overflow-y-auto">
        <slot />
      </main>
      <LayoutFooterPublic />
    </div>
  </div>
</template>
