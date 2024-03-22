// import { env } from '@/env'

export function api(path: string, init?: RequestInit) {
  const baseUrl =
    process.env.NEXT_PUBLIC_ENV === 'production'
      ? process.env.NEXT_PUBLIC_VDG_BACKEND_URL
      : process.env.NEXT_PUBLIC_VDG_BACKEND_URL_DEV

  const url = new URL(path, baseUrl)

  return fetch(url, init)
}
