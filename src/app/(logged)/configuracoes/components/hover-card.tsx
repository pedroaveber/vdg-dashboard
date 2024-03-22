'use client'

import * as PrimitiveHoverCard from '@radix-ui/react-hover-card'
import { Info } from 'lucide-react'

interface HoverCardProps {
  children: React.ReactNode
}

export function HoverCard({ children }: HoverCardProps) {
  return (
    <PrimitiveHoverCard.Root>
      <PrimitiveHoverCard.Trigger>
        <Info size={14} className="stroke-zinc-500 dark:stroke-zinc-600" />
      </PrimitiveHoverCard.Trigger>

      <PrimitiveHoverCard.Portal>
        <PrimitiveHoverCard.Content className="w-[300px] rounded-md border border-zinc-300 bg-white p-4 shadow-md dark:border-zinc-600 dark:bg-zinc-900">
          <PrimitiveHoverCard.Arrow />
          {children}
        </PrimitiveHoverCard.Content>
      </PrimitiveHoverCard.Portal>
    </PrimitiveHoverCard.Root>
  )
}
