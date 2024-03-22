'use client'

import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { Button } from './FormComponents'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { RoutesType } from '@/@types/Routes'
import { deleteItem } from '@/utils/delete-item'

interface DeleteDialogProps {
  children: React.ReactNode
  itemId: string
  action: RoutesType
}

export function DeleteDialog({ children, action, itemId }: DeleteDialogProps) {
  const router = useRouter()

  async function handleDelete() {
    try {
      await deleteItem({
        action,
        id: itemId,
      })
      toast.success('Item excluído com sucesso!')
      router.refresh()
    } catch {
      toast.error('Erro ao excluir item!')
    }
  }

  return (
    <AlertDialog.Root>
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
                variant="danger"
                className="font-bold"
                onClick={handleDelete}
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
