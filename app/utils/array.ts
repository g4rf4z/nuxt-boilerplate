/**
 * Removes the first occurrence of an item from an array by mutating the original array
 * @param array - The array to remove the item from
 * @param item - The item to remove from the array
 * @returns True if an item was removed, false otherwise
 */
export function removeItemFromArray<T>(array: T[], item: T): boolean {
  const index = array.indexOf(item)
  if (index > -1) {
    array.splice(index, 1)
    return true
  }
  return false
}
