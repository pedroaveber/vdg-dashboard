'use client'

import { useUserContext } from '@/contexts/UserContext'
import LogoLight from '@/assets/img/VozesDoGiganteLogo.png'
import LogoDark from '@/assets/img/VozesDoGiganteLogoBranco.png'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { ThemeSwitcher } from './ThemeSwitcher'
import { AccountInfoPopover } from './AccountInfoPopover'
import { MobileHeaderPopover } from './MobileHeaderPopover'
import { getPageTitle } from '@/utils/get-page-title'
import { User } from 'lucide-react'

export function Header() {
  const currentRoute = usePathname()
  const { theme } = useTheme()

  const pageTilte = getPageTitle(currentRoute)

  const { currentUser } = useUserContext()

  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex h-[80px] items-center justify-center border-b border-zinc-300 bg-white dark:border-zinc-500 dark:bg-zinc-900 md:left-[230px]">
      <div className="flex w-full max-w-[1200px] items-center justify-between px-4">
        <MobileHeaderPopover />
        <Image
          src={theme === 'dark' ? LogoDark : LogoLight}
          width={120}
          height={80}
          alt="Vozes do Gigante"
          className="ml-2 mr-auto md:hidden"
        />

        <span className="hidden text-4xl font-bold text-zinc-700 dark:text-zinc-50 md:block">
          {pageTilte}
        </span>

        <div className="hidden items-center justify-start gap-8 md:flex">
          <ThemeSwitcher />

          <Link href={'/perfil?id=' + currentUser?.id}>
            {currentUser?.avatar ? (
              <Image
                src={currentUser.avatar}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover duration-150 hover:opacity-70"
              />
            ) : (
              <figure className="flex items-center justify-center rounded-full border border-zinc-700 p-1 dark:border-zinc-50">
                <User
                  strokeWidth={1.5}
                  className="h-5 w-5 stroke-zinc-700 dark:stroke-zinc-50"
                />
              </figure>
            )}
          </Link>
        </div>

        <div className="md:hidden">
          <AccountInfoPopover />
        </div>
      </div>
    </header>
  )
}
