'use client'

import * as Dialog from '@radix-ui/react-alert-dialog'
import { Button } from '@/components/FormComponents/Button'
import { ButtonSpinner } from '@/components/ButtonSpinner'
import { FeedType } from '@/@types/Database'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { feedServices } from '../services'

interface FeeedWhatsappDialogProps {
  children: React.ReactNode
  feed: FeedType
  open: boolean
  setOpen: (open: boolean) => void
}

export function FeedWhatsappDialog({
  children,
  feed,
  open,
  setOpen,
}: FeeedWhatsappDialogProps) {
  const queryClient = useQueryClient()

  // Toggle feed active status
  const feedPublishedStatus = useMutation({
    mutationFn: async () => {
      await feedServices.update({
        ...feed,
        published: true,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeds-general'] })
    },
  })

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[450px] w-[90%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-zinc-300 bg-white p-4 shadow-sm data-[state=open]:animate-contentShow dark:border-zinc-500 dark:bg-zinc-900 md:w-full">
          <Dialog.Title className="text-lg font-bold text-zinc-700 dark:text-zinc-50">
            Atenção!!
          </Dialog.Title>

          <Dialog.Description className="my-4">
            Você marcou para publicar esse FEED no canal do whatsapp, confirma
            essa ação?
          </Dialog.Description>

          <div className="mt-8 flex w-full items-center justify-end gap-2">
            <Dialog.Cancel>
              <Button variant="ghost" className="font-bold">
                Cancelar
              </Button>
            </Dialog.Cancel>

            <Dialog.Action asChild>
              <Button
                variant="primary"
                className="font-bold"
                type="submit"
                form="feed-form"
                disabled={feedPublishedStatus.isPending}
                onClick={() => feedPublishedStatus.mutate()}
              >
                {feedPublishedStatus.isPending ? (
                  <ButtonSpinner />
                ) : (
                  'Publicar e salvar'
                )}
              </Button>
            </Dialog.Action>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
