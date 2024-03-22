'use client'

import * as Popover from '@radix-ui/react-popover'
import { Button } from './FormComponents'
import { Menu, X } from 'lucide-react'
import { Sibdebar } from './Sidebar'
import { useMobileHeader } from '@/contexts/mobile-header-context'

export function MobileHeaderPopover() {
  const { isOpen, handleClose, handleOpen } = useMobileHeader()

  return (
    <Popover.Root open={isOpen}>
      <Popover.Trigger
        asChild
        className="peer data-[state=open]:hidden md:hidden"
      >
        <Button variant="ghost" onClick={handleOpen}>
          <Menu
            strokeWidth={1.5}
            className="h-7 w-7 stroke-zinc-700 dark:stroke-zinc-50"
          />
        </Button>
      </Popover.Trigger>

      <Popover.Close asChild className="peer-data-[state=closed]:hidden">
        <Button variant="ghost" onClick={handleClose}>
          <X
            strokeWidth={1.5}
            className="h-7 w-7 stroke-zinc-700 dark:stroke-zinc-50"
          />
        </Button>
      </Popover.Close>
      <Popover.Portal>
        <Popover.Content className="w-screnn group fixed top-[80px] z-50 h-[calc(100vh-80px)]">
          <Sibdebar />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
