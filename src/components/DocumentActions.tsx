'use client'

import { DeleteDialog } from './DeleteDialog'
import { Button } from './FormComponents'
import { Anchor } from './Anchor'
import { RoutesType } from '@/@types/Routes'

interface DocumentActionsProps {
  href: string
  id: string
  action: RoutesType
}

export function DocumentActions({ href, action, id }: DocumentActionsProps) {
  return (
    <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-end">
      <Anchor
        href={href}
        variant="outline"
        className="flex w-full items-center justify-center px-2 py-2 text-base md:w-auto md:py-1 md:text-sm"
      >
        Editar
      </Anchor>

      <DeleteDialog itemId={id} action={action}>
        <Button
          variant="danger"
          widthType="full"
          className="flex items-center justify-center gap-1 py-2  text-base font-bold md:w-auto md:py-1 md:text-sm"
        >
          Excluir
        </Button>
      </DeleteDialog>
    </div>
  )
}
