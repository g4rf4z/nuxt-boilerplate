import type { PlainObject } from '@/types'
import { cloneDeep, isEmpty, isEqual, isPlainObject, merge } from 'lodash-es'

interface CompactOptions {
  array?: boolean
  boolean?: boolean
  null?: boolean
  object?: boolean
  string?: boolean
  undefined?: boolean
}

/**
 * Verifies if a value is empty (array, object, string, null, undefined)
 * @param value - The value to verify
 * @returns True if the value is considered empty
 */
export function isObjectEmpty(value: unknown): boolean {
  return isEmpty(value)
}

/**
 * Verifies if two values are deeply equal
 * @param a - First value to verify
 * @param b - Second value to verify
 * @returns True if values are deeply equal
 */
export function isObjectEqual<T>(a: T, b: T): boolean {
  return isEqual(a, b)
}

/**
 * Creates a deep clone of a value
 * @param value - The value to clone
 * @returns A deep copy of the value
 */
export function deepClone<T>(value: T): T {
  return cloneDeep(value)
}

/**
 * Merges two objects deeply
 * @param target - The target object to merge into
 * @param source - The source object to merge from
 * @returns The merged target object
 */
export function deepMerge<T, U>(target: T, source: U): T & U {
  return merge(target, source)
}

/**
 * Compares two objects and returns the differences
 * @param current - The current state of the object
 * @param initial - The initial state of the object
 * @returns An object containing only the differences, or undefined if no differences
 */
export function deepDiff<T extends Record<string, any>>(
  current: T,
  initial: T,
): Partial<T> | undefined {
  if (!isPlainObject(current) || !isPlainObject(initial)) {
    return !isObjectEqual(current, initial) ? current : undefined
  }

  const diff: Partial<T> = {}

  for (const key in current) {
    const nestedDiff = deepDiff(current[key], initial[key])
    if (nestedDiff !== undefined) {
      diff[key] = nestedDiff as T[typeof key]
    }
  }

  for (const key in initial) {
    if (!(key in current)) {
      diff[key] = undefined as any
    }
  }

  return Object.keys(diff).length > 0 ? diff : undefined
}

/**
 * Removes empty/falsy values from an object recursively
 * @param object - The object to clean
 * @param remove - Configuration for which values to remove
 * @returns The cleaned object
 */
export function compact<T>(object: PlainObject, remove: CompactOptions = {}): T {
  if (!object || typeof object !== 'object')
    return object

  const removableValues = {
    null: true,
    undefined: true,
    string: true,
    boolean: true,
    array: true,
    object: true,
  }

  const rV = {
    ...removableValues,
    ...remove,
  }

  Object.keys(object).forEach((key) => {
    if (
      (rV.null && object[key] === null)
      || (rV.undefined && object[key] === undefined)
      || (rV.string && object[key] === '')
      || (rV.boolean && object[key] === false)
      || (rV.array && Array.isArray(object[key]) && object[key].length === 0)
      || (rV.object && isPlainObject(object[key]) && Object.keys(object[key]).length === 0)
    ) {
      delete object[key]
    }
    else if (isPlainObject(object[key])) {
      object[key] = compact(object[key], rV)
      if (rV.object && isPlainObject(object[key]) && Object.keys(object[key]).length === 0) {
        delete object[key]
      }
    }
    else if (Array.isArray(object[key])) {
      object[key] = object[key].map((item: any) => compact(item, rV)).filter((item: any) => {
        if (rV.null && item === null)
          return false
        if (rV.undefined && item === undefined)
          return false
        if (rV.string && item === '')
          return false
        if (rV.boolean && item === false)
          return false
        if (rV.array && Array.isArray(item) && item.length === 0)
          return false
        if (rV.object && isPlainObject(item) && Object.keys(item).length === 0)
          return false
        return true
      })
    }
  })

  return object as T
}
