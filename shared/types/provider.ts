export const provider = {
  google: 'google',
  local: 'local',
} as const

export type Provider = typeof provider[keyof typeof provider]
