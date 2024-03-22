'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import * as TogglePrimitive from '@radix-ui/react-toggle'

interface ToggleProps extends TogglePrimitive.ToggleProps {
  label: string
  value: string
  onPressChange: (value: string) => void
}

export function Toggle({
  defaultPressed,
  value,
  label,
  className,
  onPressChange,
  ...props
}: ToggleProps) {
  const [isPressed, setIsPressed] = useState<boolean>(defaultPressed ?? false)

  return (
    <TogglePrimitive.Root
      {...props}
      onPressedChange={() => {
        setIsPressed((prevValue) => !prevValue)
        onPressChange(value)
      }}
      data-state={isPressed ? 'on' : 'off'}
      className={twMerge(
        'flex items-center justify-center rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-300 data-[state=on]:border-white data-[state=on]:bg-red-500 data-[state=on]:font-bold data-[state=on]:text-white dark:border-zinc-500 dark:text-zinc-500 dark:data-[state=on]:border-white dark:data-[state=on]:text-white',
        className,
      )}
    >
      {label}
    </TogglePrimitive.Root>
  )
}
