'use client'

import { useEffect, useId, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import * as SwitchPrimitive from '@radix-ui/react-switch'

interface SwitchProps extends SwitchPrimitive.SwitchProps {
  label: string
  labelClass?: string
}

export function Switch({
  label,
  className,
  defaultChecked,
  labelClass,
  ...props
}: SwitchProps) {
  const customId = useId()
  const [checked, setChecked] = useState<boolean>(!!defaultChecked)

  return (
    <div
      className={twMerge(
        'flex w-full items-center justify-between gap-4 py-2 font-medium md:justify-end md:gap-2',
        className,
      )}
    >
      <label className={labelClass} htmlFor={customId}>
        {label}
      </label>
      <SwitchPrimitive.Root
        onClick={() => setChecked((prevState) => !prevState)}
        id={customId}
        data-state={checked ? 'checked' : 'unchecked'}
        className="relative h-6 w-12 cursor-default rounded-full bg-zinc-300 shadow-sm outline-none data-[state=checked]:bg-emerald-500 md:h-5 md:w-10"
        {...props}
      >
        <SwitchPrimitive.Thumb
          data-state={checked ? 'checked' : 'unchecked'}
          className="block h-6 w-6 cursor-pointer rounded-full bg-white shadow-sm transition-transform duration-100 data-[state=checked]:translate-x-6 md:h-[20px] md:w-[20px] md:data-[state=checked]:translate-x-5"
        />
      </SwitchPrimitive.Root>
    </div>
  )
}
