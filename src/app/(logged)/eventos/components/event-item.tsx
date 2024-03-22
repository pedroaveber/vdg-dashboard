'use client'

// Core
import { useState } from 'react'

// Components
import { Anchor } from '@/components/Anchor'
import { Switch } from '@/components/UI/switch'
import { Button } from '@/components/FormComponents'

// Types
import { EventType } from '@/@types/Database'

// Hooks
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Assets
import { Check } from 'lucide-react'

// Services
import { eventServices } from '../services'
import { EventDeleteDialog } from './event-delete-dialog'
import { toast } from 'react-toastify'

export function EventItem(props: EventType) {
  const queryClient = useQueryClient()

  const [shouldShowDialog, setShouldShowDialog] = useState(false)

  // Toggle event active status
  const { mutateAsync: toggleEventStatusFn } = useMutation({
    mutationFn: async () => {
      await eventServices.update({
        ...props,
        active: !props.active,
      })
    },
    onMutate: () => {
      const cached = queryClient.getQueryData<EventType[]>(['events-general'])

      queryClient.setQueryData<EventType[]>(['events-general'], (prev) => {
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
      })

      return cached
    },
    onError: (_, __, cached) => {
      queryClient.setQueryData<EventType[]>(['events-general'], cached)
      toast.error('Erro ao atualizar status do evento')
    },
  })

  return (
    <div
      key={props.id}
      className="flex flex-col gap-2 rounded-lg border border-zinc-300 p-2 dark:border-zinc-500 md:p-4"
    >
      <div className="flex w-full flex-col md:flex-row md:items-center md:gap-4">
        <span className="text-lg font-bold md:w-[700px] md:truncate md:text-base">
          {props.title}
        </span>

        {props.active ? (
          <div className="mb-2 ml-auto flex w-full items-center justify-start gap-2 md:m-0">
            <Check size={14} className="stroke-green-500" strokeWidth={1.5} />

            <span className="text-xs text-zinc-500 dark:text-zinc-300">
              Evento ativo
            </span>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between gap-2 py-4 md:justify-end md:py-0">
            <span>Ativar Evento</span>

            <Switch
              onCheckedChange={() => toggleEventStatusFn()}
              checked={props.active}
            />
          </div>
        )}

        <div className="w-auto space-y-2">
          <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-end">
            <Anchor
              href={`/eventos/editar/${props.id}`}
              variant="outline"
              className="flex w-full items-center justify-center px-2 py-2 text-base md:w-auto md:py-1 md:text-sm"
            >
              Editar
            </Anchor>

            <EventDeleteDialog
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
            </EventDeleteDialog>
          </div>
        </div>
      </div>
    </div>
  )
}
