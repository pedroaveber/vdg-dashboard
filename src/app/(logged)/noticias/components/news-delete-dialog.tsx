'use client'

// Components
import { Button } from '@/components/FormComponents'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

// Libs
import { toast } from 'react-toastify'

// Hooks
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Services
import { newsServices } from '../services'
import { NewsType } from '@/@types/Database'

interface NewsDeleteDialogProps {
  id: string
  open: boolean
  children: React.ReactNode
  setOpen: (open: boolean) => void
}

export function NewsDeleteDialog({
  children,
  setOpen,
  open,
  id,
}: NewsDeleteDialogProps) {
  const queryClient = useQueryClient()

  const destroyNews = useMutation({
    mutationFn: async (id: string) => {
      await newsServices.destroy(id)
    },
    onSuccess: () => {
      queryClient.setQueryData<NewsType[]>(['news-general'], (prev) => {
        if (!prev) return []
        return prev.filter((news) => news.id !== id)
      })
      toast.success('News excluído com sucesso!')
      setOpen(false)
    },
    onError: () => {
      toast.error('Erro ao excluir news!')
    },
  })

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-300 bg-white p-4 shadow-sm data-[state=open]:animate-contentShow dark:border-zinc-500 dark:bg-zinc-900 md:w-full">
          <AlertDialog.Title className="text-lg font-bold text-zinc-700">
            Você tem certeza?
          </AlertDialog.Title>

          <AlertDialog.Description className="mt-4">
            Esta ação não poderá ser desfeita. Todos os dados relacionados à
            este item serão excluídos do sistema.
          </AlertDialog.Description>

          <div className="mt-8 flex w-full items-center justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <Button variant="ghost" className="font-bold">
                Cancelar
              </Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <Button
                onClick={() => destroyNews.mutate(id)}
                variant="danger"
                className="font-bold"
                type="button"
              >
                Excluir
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
