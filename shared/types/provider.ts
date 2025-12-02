export const provider = {
  google: 'google',
  local: 'local',
} as const

export const providers = Object.values(provider)

export type Provider = (typeof provider)[keyof typeof provider]
