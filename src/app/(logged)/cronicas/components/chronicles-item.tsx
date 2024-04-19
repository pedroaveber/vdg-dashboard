'use client'

import { useState } from 'react'
import { ChroniclesType } from '@/@types/Database'
import { Anchor } from '@/components/Anchor'
import { Button } from '@/components/FormComponents'
import { ChroniclesDeleteDialog } from './chronicles-delete-dialog'

export function ChroniclesItem(props: ChroniclesType) {
  const [shouldShowDialog, setShouldShowDialog] = useState(false)

  return (
    <div
      key={props.id}
      className="flex flex-col gap-2 rounded-lg border border-zinc-300 p-2 dark:border-zinc-500 md:p-4"
    >
      <div className="flex w-full flex-col md:flex-row md:items-center md:gap-4">
        <span className="text-lg font-bold md:w-[400px] md:truncate md:text-base">
          {props.title}
        </span>

        <div className="w-full space-y-2">
          <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-end">
            <Anchor
              href={`/cronicas/editar/${props.id}`}
              variant="outline"
              className="flex w-full items-center justify-center px-2 py-2 text-base md:w-auto md:py-1 md:text-sm"
            >
              Editar
            </Anchor>

            <ChroniclesDeleteDialog
              open={shouldShowDialog}
              setOpen={setShouldShowDialog}
              id={props.id}
            >
              <Button
                variant="danger"
                widthType="full"
                className="flex items-center justify-center gap-1 py-2  text-base font-bold md:w-auto md:py-1 md:text-sm"
              >
                Excluir
              </Button>
            </ChroniclesDeleteDialog>
          </div>
        </div>
      </div>
    </div>
  )
}
