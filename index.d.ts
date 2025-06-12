declare module '#app' {
  interface RuntimeNuxtHooks {
    'form:reset': () => HookResult
    'form:submit': () => HookResult
  }
}
export {}
