'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FeedType } from '@/@types/Database'
import { Anchor } from '@/components/Anchor'
import { Button } from '@/components/FormComponents'
import { FeedDeleteDialog } from '../components/feed-delete-dialog'
import { FeedReviewDialog } from '../components/feed-review-dialog'
import { FeedWhatsappDialog } from '../components/feed-whatsapp-dialog'
import { Check, Clock } from 'lucide-react'
import { useConfigContext } from '@/contexts/config-context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { feedServices } from '../services'
import { toast } from 'react-toastify'

export function FeedItem(props: FeedType) {
  const queryClient = useQueryClient()

  const [shouldShowDeleteDialog, setShouldShowDeleteDialog] = useState(false)
  const [shouldShowWhatsappDialog, setShouldShowWhatsappDialog] =
    useState(false)

  // Toggle feed published status
  const { mutateAsync: toggleFeedStatusFn } = useMutation({
    mutationFn: async () => {
      await feedServices.update({
        ...props,
        published: true,
      })
    },
    onSuccess: () => {
      queryClient.setQueryData<FeedType[]>(['feeds-general'], (prev) => {
        if (!prev) return []

        return prev.map((item) => {
          if (item.id === props.id) {
            return {
              ...item,
              published: true,
            }
          }

          return item
        })
      })
    },
    onError: () => {
      toast.error('Erro ao publicar notícia')
    },
  })

  const { dashConfig } = useConfigContext()

  const isWhatsAppEnabled = dashConfig.whatsappAlert
  const firstParagraph = props.description.substring(3, 50).concat('...')

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
        <span className="text-lg font-bold md:w-[800px] md:truncate md:text-base">
          {firstParagraph}
        </span>

        {props.published ? (
          <div className="mb-2 ml-auto flex w-full items-center justify-start gap-2 md:m-0">
            <Check size={14} className="stroke-green-500" strokeWidth={1.5} />

            <span className="text-xs text-zinc-500 dark:text-zinc-300">
              Publicado
            </span>
          </div>
        ) : (
          <div className="mb-2 ml-auto flex w-full items-center justify-start gap-2 md:m-0">
            <Clock size={14} className="stroke-orange-500" strokeWidth={1.5} />

            <span className="w-full text-xs text-zinc-500 dark:text-zinc-300">
              Aguardando publicação
            </span>
          </div>
        )}

        <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-end">
          {!props.published && (
            <Anchor
              href={`/feed/editar/${props.id}`}
              variant="outline"
              className="flex w-full items-center justify-center px-2 py-2 text-base md:w-auto md:py-1 md:text-sm"
            >
              Editar
            </Anchor>
          )}

          {props.published && (
            <FeedReviewDialog feed={props}>
              <Button
                variant="outline"
                className="flex w-full items-center justify-center px-2 py-2 text-base md:w-auto md:py-1 md:text-sm"
              >
                Visualizar
              </Button>
            </FeedReviewDialog>
          )}

          <FeedDeleteDialog
            id={props.id}
            open={shouldShowDeleteDialog}
            setOpen={setShouldShowDeleteDialog}
          >
            <Button
              variant="danger"
              widthType="full"
              className="flex items-center justify-center gap-1 py-2  text-base font-bold md:w-auto md:py-1 md:text-sm"
            >
              Excluir
            </Button>
          </FeedDeleteDialog>

          {!props.published &&
            (props.publishOnWhatsapp && isWhatsAppEnabled ? (
              <FeedWhatsappDialog
                open={shouldShowWhatsappDialog}
                setOpen={setShouldShowWhatsappDialog}
                feed={props}
              >
                <Button
                  variant="primary"
                  widthType="full"
                  className="flex items-center justify-center gap-1 py-2  text-base font-bold md:w-auto md:py-1 md:text-sm"
                >
                  Publicar
                </Button>
              </FeedWhatsappDialog>
            ) : (
              <Button
                variant="primary"
                widthType="full"
                className="flex items-center justify-center gap-1 py-2  text-base font-bold md:w-auto md:py-1 md:text-sm"
                onClick={() => toggleFeedStatusFn()}
              >
                Publicar
              </Button>
            ))}
        </div>
      </div>
    </div>
  )
}
