export const currency = {
  EUR: 'EUR',
  USD: 'USD',
} as const

export const currencies = Object.values(currency)

export type Currency = (typeof currency)[keyof typeof currency]
