export default defineAppConfig({
  toaster: {
    duration: 5000,
    expand: true,
    position: 'top-right' as const,
  },

  tooltip: {
    delayDuration: 700,
    disableClosingTrigger: false,
    disableHoverableContent: false,
    disabled: false,
    ignoreNonKeyboardFocus: false,
    skipDelayDuration: 300,
  },

  ui: {
    colors: {
      error: 'red',
      info: 'violet',
      neutral: 'slate',
      primary: 'blue',
      success: 'green',
      warning: 'yellow',
    },
  },
})
