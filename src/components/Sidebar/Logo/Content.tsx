'use client'

import Image from 'next/image'

import { useTheme } from 'next-themes'

import LogoLight from '@/assets/img/VozesDoGiganteLogo.png'
import LogoDark from '@/assets/img/VozesDoGiganteLogoBranco.png'

export function Content() {
  const { theme } = useTheme()

  if (!theme) return null

  return (
    <div className="hidden h-[80px] w-full items-center justify-start bg-zinc-50 px-4 dark:bg-zinc-800 md:flex">
      {theme === 'dark' ? (
        <Image src={LogoDark} width={150} height={80} alt="Vozes do Gigante" />
      ) : (
        <Image src={LogoLight} width={150} height={80} alt="Vozes do Gigante" />
      )}
    </div>
  )
}
