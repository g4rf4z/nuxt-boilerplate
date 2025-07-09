<script setup lang="ts">
const { t } = useTranslation()
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="flex flex-row items-center justify-end h-12 px-4 border-t border-gray-200 dark:border-gray-800">
    <p class="caption text-gray-500">
      {{ t("COPYRIGHT", { year }) }}
    </p>
  </footer>
</template>

<i18n lang="json">
{
    "en-US": {
        "COPYRIGHT": "Copyright © {year} Epsi Edge. All rights reserved."
    },
    "es-ES": {
        "COPYRIGHT": "Copyright © {year} Epsi Edge. Todos los derechos reservados."
    },
    "fr-FR": {
        "COPYRIGHT": "Copyright © {year} Epsi Edge. Tous droits réservés."
    }
}
</i18n>
