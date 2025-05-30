export default defineAppConfig({
  toaster: {
    position: 'top-right' as const,
    expand: true,
    duration: 5000,
  },

  tooltip: {
    delayDuration: 700,
    skipDelayDuration: 300,
    disableHoverableContent: false,
    disableClosingTrigger: false,
    disabled: false,
    ignoreNonKeyboardFocus: false,
  },

  ui: {
    colors: {
      primary: 'green',
      success: 'green',
      warning: 'yellow',
      error: 'red',
    },
  },
})
