'use client'

// Core
import Image from 'next/image'
import { useState } from 'react'

// Components
import { Anchor } from '@/components/Anchor'
import { Button } from '@/components/FormComponents'
import { Switch } from '@/components/UI/switch'

// Hooks
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Services
import { covenantServices } from '../services'

// Types
import type { CovenantType } from '@/@types/Database'
import { CovenantDeleteDialog } from './covenant-delete-dialog'
import { toast } from 'react-toastify'

export function CovenantItem(props: CovenantType) {
  const queryClient = useQueryClient()

  const [shouldShowDialog, setShouldShowDialog] = useState(false)

  // Toggle banner active status
  const { mutateAsync: toggleCovenantStatusFn } = useMutation({
    mutationFn: async () => {
      await covenantServices.update({
        ...props,
        active: !props.active,
      })
    },
    onMutate: () => {
      const cached = queryClient.getQueryData<CovenantType[]>([
        'covenants-general',
      ])

      queryClient.setQueryData<CovenantType[]>(
        ['covenants-general'],
        (prev) => {
          if (!prev) return []

          return prev.map((item) => {
            if (item.id === props.id) {
              return {
                ...item,
                active: !item.active,
              }
            }

            return item
          })
        },
      )

      return cached
    },
    onError: (_, __, cached) => {
      queryClient.setQueryData<CovenantType[]>(['covenants-general'], cached)
      toast.error('Erro ao atualizar status do convênio')
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
          <span>Ativar convênio</span>

          <Switch
            onCheckedChange={() => toggleCovenantStatusFn()}
            checked={props.active}
          />
        </div>

        <div className="w-full space-y-2">
          <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-end">
            <Anchor
              href={`/convenios/editar/${props.id}`}
              variant="outline"
              className="flex w-full items-center justify-center px-2 py-2 text-base md:w-auto md:py-1 md:text-sm"
            >
              Editar
            </Anchor>

            <CovenantDeleteDialog
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
            </CovenantDeleteDialog>
          </div>
        </div>
      </div>
    </div>
  )
}
