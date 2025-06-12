<script setup lang="ts">
const { t } = useTranslation()
const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer class="h-12 border-t border-gray-200 dark:border-gray-800 flex flex-row items-center justify-end px-4">
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
    "fr-FR": {
        "COPYRIGHT": "Copyright © {year} Epsi Edge. Tous droits réservés."
    },
    "es-ES": {
        "COPYRIGHT": "Copyright © {year} Epsi Edge. Todos los derechos reservados."
    }
}
</i18n>
