'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navItems } from './data'
import { useMobileHeader } from '@/contexts/mobile-header-context'
import { useUserContext } from '@/contexts/UserContext'

export function Navigation() {
  const currentPath = usePathname()
  const { handleClose } = useMobileHeader()

  function isTheActiveRoute(path: string): boolean {
    return currentPath.includes(path)
  }

  const { currentUser } = useUserContext()

  const userPolicy = currentUser?.policy || []
  const userIsSuperAdmin = currentUser?.role === 'super-admin' || false

  return (
    <nav className="flex max-h-[60vh] w-full flex-col items-start overflow-hidden overflow-y-auto md:max-h-none">
      {navItems
        .filter((item) => {
          if (userIsSuperAdmin) return true
          if (userPolicy.includes(item.value)) return true
          return false
        })
        .map(({ Icon, href, name, value, disabled }) => {
          const isUserAllowed = userPolicy.includes(value) || userIsSuperAdmin

          if (isUserAllowed && !disabled) {
            return (
              <button onClick={handleClose} key={href} className="w-full">
                <Link
                  href={href}
                  key={href}
                  data-current={isTheActiveRoute(href)}
                  className="group flex w-full items-center justify-start gap-4 bg-zinc-50 p-4 transition-colors data-[current=true]:cursor-auto data-[current=true]:bg-white hover:bg-zinc-100 data-[current=true]:hover:bg-white dark:bg-zinc-800 dark:data-[current=true]:bg-zinc-900 dark:hover:bg-zinc-900"
                >
                  <Icon
                    strokeWidth={1.5}
                    className="h-6 w-6 stroke-zinc-700 group-data-[current=true]:stroke-red-500 group-data-[current=true]:text-red-500 dark:stroke-zinc-50"
                  />
                  <span className="group-data-[current=true]:font-bold group-data-[current=true]:text-red-500">
                    {name}
                  </span>
                </Link>
              </button>
            )
          } else {
            return (
              <div
                key={href}
                className="flex w-full items-center justify-start gap-4 bg-zinc-50 p-4 transition-colors dark:bg-zinc-800"
              >
                <Icon
                  strokeWidth={1.5}
                  className="h-6 w-6 stroke-zinc-700 opacity-50 dark:stroke-zinc-50"
                />
                <span className="opacity-50">{name}</span>
              </div>
            )
          }
        })}
    </nav>
  )
}
