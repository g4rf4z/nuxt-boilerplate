declare module '#auth-utils' {
  interface User {
    id: number
    email: string
    locale: Locale
    // Add your own fields
  }

  interface UserSession {
    id: number
    // Add your own fields
  }

  interface SecureSessionData {
    // Add your own fields
  }
}

export {}
