'use client'

import * as Popover from '@radix-ui/react-popover'
import { Button } from './FormComponents'
import { User, X } from 'lucide-react'
import { SignOut } from './SignOut'
import { useUserContext } from '@/contexts/UserContext'
import Image from 'next/image'
import { Anchor } from './Anchor'

export function AccountInfoPopover() {
  const { currentUser } = useUserContext()

  return (
    <Popover.Root>
      <Popover.Trigger
        asChild
        className="peer data-[state=open]:hidden md:hidden"
      >
        {currentUser && currentUser.avatar ? (
          <Button
            variant="ghost"
            className="flex items-center justify-center rounded-full p-0"
          >
            <Image
              src={currentUser.avatar}
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 rounded-full object-cover duration-150 hover:opacity-70"
            />
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="flex h-10 w-10 items-center justify-center rounded-full"
          >
            <User
              strokeWidth={1.5}
              className="h-7 w-7 stroke-zinc-700 dark:stroke-zinc-50"
            />
          </Button>
        )}
      </Popover.Trigger>

      <Popover.Close asChild className="peer-data-[state=closed]:hidden">
        <Button variant="ghost">
          <X
            strokeWidth={1.5}
            className="h-7 w-7 stroke-zinc-700 dark:stroke-zinc-50"
          />
        </Button>
      </Popover.Close>

      <Popover.Portal>
        <Popover.Content
          className="group fixed left-[calc(100vw-10rem-1rem)] top-[90px] z-10 flex w-40 flex-col items-center justify-center overflow-hidden rounded-md border border-zinc-300 bg-white dark:border-zinc-500 dark:bg-zinc-900 md:hidden"
          side="bottom"
        >
          <Anchor
            variant="ghost"
            className="flex w-full items-center justify-start rounded-none py-4"
            href="/perfil"
          >
            <User />
            <span>Ver Perfil</span>
          </Anchor>
          <SignOut />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
