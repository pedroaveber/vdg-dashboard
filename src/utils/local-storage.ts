import { addMilliseconds, isBefore, parseISO } from 'date-fns'

interface LocalStorageItem<T> {
  value: T
  expiresAt: string
}

export function getFromLocalStorage<T>(key: string): T | null {
  const stored = localStorage.getItem(key)

  if (!stored) {
    return null
  }

  const { expiresAt, value } = JSON.parse(stored) as LocalStorageItem<T>

  const stillValid = isBefore(parseISO(expiresAt), new Date())

  if (!stillValid) {
    localStorage.removeItem(key)
    return null
  }

  return value
}

/**
 *
 * @param key - Key to store the value
 * @param value - Value to be stored
 * @param expiresIn - Time in milliseconds for the value to expire
 */
export function setLocalStorageItem<T = any>(
  key: string,
  value: T,
  expiresIn: number,
) {
  const expiresAt = addMilliseconds(new Date(), expiresIn)

  const item: LocalStorageItem<T> = {
    expiresAt: expiresAt.toISOString(),
    value,
  }

  localStorage.setItem(key, JSON.stringify(item))
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key)
}
