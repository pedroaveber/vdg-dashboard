'use client'

// Components
import * as Dialog from '@radix-ui/react-alert-dialog'
import { ButtonSpinner } from '@/components/ButtonSpinner'
import * as FormComponents from '@/components/FormComponents'

// Libs
import { toast } from 'react-toastify'

// Hooks
import { useMutation, useQueryClient } from '@tanstack/react-query'

// Services
import { usersServices } from '../services'

// Types
import type { UserType } from '@/@types/Database'

interface DeleteUserDialogProps {
  open: boolean
  user: UserType
  children: React.ReactNode
  setOpen: (value: boolean) => void
}

export function DeleteUserDialog({
  user,
  open,
  setOpen,
  children,
}: DeleteUserDialogProps) {
  const queryClient = useQueryClient()

  const removeUserMutation = useMutation({
    mutationFn: async () => {
      await usersServices.update({
        ...user,
        role: 'user',
        policy: [],
      })
    },
    onError: () => {
      toast.error('Erro ao remover usuário')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-general'] })
    },
  })

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-300 bg-white p-4 shadow-sm data-[state=open]:animate-contentShow dark:border-zinc-500 dark:bg-zinc-900 md:w-full">
          <div className="fixed left-0 right-0 top-0 flex h-[60px] items-center justify-start px-4">
            <Dialog.Title className="text-lg font-bold text-zinc-700 dark:text-zinc-50">
              Atenção!! Esta ação não poderá ser desfeita
            </Dialog.Title>
          </div>

          <Dialog.Description className="mt-[60px] w-full">
            Você tem certeza que deseja remover este usuário dos
            administradores?
          </Dialog.Description>

          <div className="mt-8 flex w-full items-center justify-end gap-2">
            <Dialog.Cancel asChild>
              <FormComponents.Button variant="ghost" className="font-bold">
                Fechar
              </FormComponents.Button>
            </Dialog.Cancel>

            <FormComponents.Button
              type="button"
              form="handle-create-user-form"
              onClick={() => removeUserMutation.mutate()}
              disabled={removeUserMutation.isPending}
            >
              {removeUserMutation.isPending ? (
                <ButtonSpinner />
              ) : (
                'Excluir usuário'
              )}
            </FormComponents.Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
