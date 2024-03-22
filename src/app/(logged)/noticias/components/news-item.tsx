'use client'

import Image from 'next/image'
import { useState } from 'react'
import { NewsType } from '@/@types/Database'
import { Anchor } from '@/components/Anchor'
import { Switch } from '@/components/UI/switch'
import { Button } from '@/components/FormComponents'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { newsServices } from '../services'
import { NewsDeleteDialog } from './news-delete-dialog'
import { toast } from 'react-toastify'

export function NewsItem(props: NewsType) {
  const queryClient = useQueryClient()

  const [shouldShowDialog, setShouldShowDialog] = useState(false)

  // Toggle news active status
  const { mutateAsync: toggleItemStatusFn } = useMutation({
    mutationFn: async () => {
      await newsServices.update({
        ...props,
        active: !props.active,
      })
    },
    onMutate: () => {
      const cached = queryClient.getQueryData<NewsType[]>(['news-general'])
      queryClient.setQueryData<NewsType[]>(['news-general'], (prev) => {
        if (!prev) return []

        return prev.map((news) => {
          if (news.id === props.id) {
            return {
              ...news,
              active: !news.active,
            }
          }

          return news
        })
      })

      return cached
    },
    onError: (_, __, cached) => {
      queryClient.setQueryData<NewsType[]>(['news-general'], cached)
      toast.error('Erro ao atualizar status da notícia')
    },
  })

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
          {props.title}
        </span>

        <div className="flex w-full items-center justify-between gap-2 py-4 md:justify-end md:py-0">
          <span>Ativar Notícia</span>

          <Switch
            onCheckedChange={() => toggleItemStatusFn()}
            checked={props.active}
          />
        </div>

        <div className="w-full space-y-2">
          <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-end">
            <Anchor
              href={`/noticias/editar/${props.id}`}
              variant="outline"
              className="flex w-full items-center justify-center px-2 py-2 text-base md:w-auto md:py-1 md:text-sm"
            >
              Editar
            </Anchor>

            <NewsDeleteDialog
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
            </NewsDeleteDialog>
          </div>
        </div>
      </div>
    </div>
  )
}
