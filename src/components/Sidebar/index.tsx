'use client'

import Image from 'next/image'
import { Navigation } from './Navigation'

import { ThemeSwitcher } from '../ThemeSwitcher'
import { SignOut } from '../SignOut'
import { useTheme } from 'next-themes'

import LogoLight from '@/assets/img/VozesDoGiganteLogo.png'
import LogoDark from '@/assets/img/VozesDoGiganteLogoBranco.png'

export function Sibdebar() {
  const { theme } = useTheme()

  return (
    <aside className="fixed bottom-0 left-0 right-0 top-[80px] z-10 flex h-[calc(100vh-80px)] w-screen -translate-x-[100%] flex-col items-start border-r border-zinc-300 bg-zinc-50 group-data-[state=open]:translate-x-0 dark:border-zinc-500 dark:bg-zinc-800 md:top-0 md:flex md:h-screen md:w-[230px] md:translate-x-0">
      <div className="hidden h-[80px] w-full items-center justify-start bg-zinc-50 px-4 dark:bg-zinc-800 md:flex">
        <Image
          src={theme === 'dark' ? LogoDark : LogoLight}
          width={150}
          height={80}
          alt="Vozes do Gigante"
        />

        <span className="ml-auto mt-auto pb-3 text-right text-xs text-gray-600">
          v.1.0.5
        </span>
      </div>

      <Navigation />

      <div className="mb-20 mt-auto flex items-start px-4 py-8 md:hidden">
        <ThemeSwitcher />
      </div>

      <div className="mt-auto hidden w-full border-t border-zinc-300 dark:border-zinc-500 md:block">
        <SignOut />
      </div>
    </aside>
  )
}
