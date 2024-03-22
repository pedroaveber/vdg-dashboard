'use client'

import * as Select from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'
import { ReactNode } from 'react'

type RootProps = Select.SelectProps & {
  children: ReactNode
  placeholder: string
  label: string
}

export function Root({ children, placeholder, label, ...props }: RootProps) {
  return (
    <div className="w-full space-y-2">
      <label className="block font-medium">{label}</label>

      <Select.Root {...props}>
        <Select.Trigger className="flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm outline-none data-[placeholder]:text-zinc-400 dark:border-zinc-500">
          <Select.Value
            className="text-zinc-400 placeholder:text-zinc-400"
            placeholder={placeholder}
          />

          <Select.Icon>
            <ChevronDown className="h-5 w-5 stroke-zinc-500" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            side="bottom"
            position="popper"
            className="z-[999] w-[--radix-select-trigger-width] animate-slideDownAndFade overflow-hidden rounded-lg border border-zinc-300 bg-white dark:border-zinc-500"
            sideOffset={8}
          >
            <Select.Viewport>{children}</Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
