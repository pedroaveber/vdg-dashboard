'use client'

import { Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Anchor } from './Anchor'

interface NewItemAnchorProps {
  customHref?: string
}

export function NewItemAnchor(props?: NewItemAnchorProps) {
  const shouldNotDisplayTheAnchor = ['novo', 'editar', 'auth']

  const currentPath = usePathname()

  const notDisplay = shouldNotDisplayTheAnchor.some((path) =>
    currentPath.includes(path),
  )

  if (notDisplay) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 flex w-full items-center justify-center border-none bg-white px-4 py-2 pb-4 dark:bg-zinc-900 md:relative md:w-auto md:p-0">
      <Anchor
        href={props?.customHref ?? `${currentPath}/novo`}
        className="w-full py-3 text-base md:w-auto md:px-4 md:py-2"
      >
        <Plus strokeWidth={3} className="h-5 w-5 stroke-white" />
        Adicionar
      </Anchor>
    </div>
  )
}
