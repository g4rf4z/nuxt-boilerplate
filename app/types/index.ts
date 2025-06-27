export type ComponentColor = 'primary' | 'info' | 'success' | 'warning' | 'error'
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type PlainObject = Record<string, any>
export interface CompactOptions {
  array?: boolean
  boolean?: boolean
  null?: boolean
  object?: boolean
  string?: boolean
  undefined?: boolean
}
