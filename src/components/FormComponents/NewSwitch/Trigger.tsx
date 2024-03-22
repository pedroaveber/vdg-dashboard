'use client'

import * as Switch from '@radix-ui/react-switch'
import { useSwitch } from './Root'
import { useState } from 'react'

export function Trigger({ defaultChecked, ...props }: Switch.SwitchProps) {
  const [checked, setChecked] = useState<boolean>(defaultChecked ?? true)
  const { customId } = useSwitch()

  return (
    <Switch.Root
      onClick={() => setChecked((prevState) => !prevState)}
      id={customId}
      data-state={checked ? 'checked' : 'unchecked'}
      className="relative h-6 w-12 cursor-default rounded-full bg-zinc-300 shadow-sm outline-none data-[state=checked]:bg-emerald-500 md:h-5 md:w-10"
      {...props}
    >
      <Switch.Thumb
        data-state={checked ? 'checked' : 'unchecked'}
        className="block h-6 w-6 cursor-pointer rounded-full bg-white shadow-sm transition-transform duration-100 data-[state=checked]:translate-x-6 md:h-[20px] md:w-[20px] md:data-[state=checked]:translate-x-5"
      />
    </Switch.Root>
  )
}
