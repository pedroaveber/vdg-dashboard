'use client'

import * as Switch from '@radix-ui/react-switch'
import { Moon } from 'lucide-react'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isPageMounted, setIsPageMounted] = useState(false)

  useEffect(() => {
    setIsPageMounted(true)
  }, [])

  function handleChangeTheme() {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  if (!isPageMounted) return null

  const isSettedAsDarkMode = theme === 'dark'

  return (
    <div className="flex items-center justify-start gap-2">
      <Switch.Root
        data-state={isSettedAsDarkMode ? 'checked' : 'unchecked'}
        onCheckedChange={handleChangeTheme}
        className="relative h-7 w-14 cursor-default rounded-full bg-zinc-300 shadow-sm outline-none data-[state=checked]:bg-red-500 md:h-5 md:w-10"
      >
        <Switch.Thumb
          data-state={isSettedAsDarkMode ? 'checked' : 'unchecked'}
          className="block h-7 w-7 cursor-pointer rounded-full bg-white shadow-sm transition-transform duration-100 data-[state=checked]:translate-x-7 md:h-[19px] md:w-[19px] md:data-[state=checked]:translate-x-5"
        />
      </Switch.Root>

      <Moon
        className="h-5 w-5 stroke-zinc-700 dark:stroke-zinc-50"
        strokeWidth={1.5}
      />
    </div>
  )
}
