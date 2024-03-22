'use client'
import React from 'react'

import * as Dialog from '@radix-ui/react-alert-dialog'
import type { EventType } from '@/@types/Database'
import { Button } from '@/components/FormComponents/Button'
import { EventsService } from '@/lib/firebase/database/events-service'
import { toast } from 'react-toastify'
import { Select } from '@/components/FormComponents'

type EventDialogProps = {
  children: React.ReactNode
  isLoading: boolean
  selectedEvent: string | null
  events: { id: string; title: string }[]
  generateEventReport: () => Promise<void>
  setSelectedEvent: (event: string | null) => void
  open: boolean
  setOpen: (open: boolean) => void
}

export function EventDialog({
  children,
  open,
  setOpen,
  events,
  generateEventReport,
  isLoading,
  selectedEvent,
  setSelectedEvent,
}: EventDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-300 bg-white p-4 shadow-sm data-[state=open]:animate-contentShow dark:border-zinc-500 dark:bg-zinc-900 md:w-full">
          {isLoading ? (
            <Select.Skeleton />
          ) : (
            <Select.Root
              placeholder="Selecione o evento"
              label="Evento desejado"
              onValueChange={setSelectedEvent}
            >
              {events.map((event) => (
                <Select.Item
                  text={event.title}
                  key={event.id}
                  value={event.id}
                />
              ))}
            </Select.Root>
          )}

          <div className="mt-8 flex w-full items-center justify-end gap-2">
            <Dialog.Cancel asChild>
              <Button type="button" variant="ghost" className="font-bold">
                Fechar
              </Button>
            </Dialog.Cancel>

            <Button
              type="button"
              disabled={!selectedEvent}
              onClick={generateEventReport}
            >
              Aplicar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
