// Core
import Image from 'next/image'
import { useState } from 'react'

// Types
import { ChannelType } from '@/@types/Database'

// Components
import { Anchor } from '@/components/Anchor'
import { Button } from '@/components/FormComponents'
import { ChannelDeleteDialog } from './channel-delete-dialog'

export function ChannelItem(props: ChannelType) {
  const [shouldShowDialog, setShouldShowDialog] = useState(false)

  return (
    <div
      key={props.id}
      className="flex flex-col gap-2 rounded-lg border border-zinc-300 p-2 dark:border-zinc-500 md:p-4"
    >
      {props.imagePath && (
        <Image
          alt="Imagem do documento"
          src={props.imagePath}
          width={400}
          height={400}
          data-type={'noticia'}
          className="h-[200px] w-full object-cover data-[type=banner]:h-[60px] md:hidden"
        />
      )}

      <div className="flex w-full flex-col md:flex-row md:items-center md:gap-4">
        <span className="text-lg font-bold md:w-[400px] md:truncate md:text-base">
          {props.name}
        </span>

        <div className="w-full space-y-2">
          <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-end">
            <Anchor
              href={`/channels/editar/${props.id}`}
              variant="outline"
              className="flex w-full items-center justify-center px-2 py-2 text-base md:w-auto md:py-1 md:text-sm"
            >
              Editar
            </Anchor>

            <ChannelDeleteDialog
              id={props.id}
              open={shouldShowDialog}
              setOpen={setShouldShowDialog}
            >
              <Button
                variant="danger"
                widthType="full"
                className="flex items-center justify-center gap-1 py-2  text-base font-bold md:w-auto md:py-1 md:text-sm"
              >
                Excluir
              </Button>
            </ChannelDeleteDialog>
          </div>
        </div>
      </div>
    </div>
  )
}
