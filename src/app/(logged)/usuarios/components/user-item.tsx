'use client'

import { UserType } from '@/@types/Database'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/UI/accordion'
import { useUsers } from '../hooks/use-users'
import { Switch } from '@/components/UI/switch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usersServices } from '../services'
import { toast } from 'react-toastify'
import { Button } from '@/components/FormComponents'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { DeleteUserDialog } from './delete-user-dialog'

type UpdateUserMutationProps = {
  policy: string
  method: 'insert' | 'remove'
}

type UserItemProps = {
  user: UserType
}

export function UserItem({ user }: UserItemProps) {
  const [shouldShowModal, setShouldShowModal] = useState(false)

  const { policies } = useUsers()

  const queryClient = useQueryClient()

  const updateUserMutation = useMutation({
    mutationFn: async ({ policy, method }: UpdateUserMutationProps) => {
      await usersServices.update({
        ...user,
        policy:
          method === 'insert'
            ? [...user.policy, policy]
            : user.policy.filter((item) => item !== policy),
      })
    },
    onError: () => {
      toast.error('Erro ao alterar permissões do usuário')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-general'] })
    },
  })

  const userIsSuperAdmin = user.role === 'super-admin'

  return (
    <AccordionItem
      disabled={false}
      value={user.id}
      key={user.id}
      className="w-full"
    >
      <AccordionTrigger className="flex w-full items-center justify-between hover:no-underline">
        <div>
          <span className="block text-left text-base font-normal">
            {user.name || 'Não identificado'}
          </span>
          <span className="block text-left text-xs font-normal">
            {user.email}
          </span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="flex w-full flex-col items-start gap-2">
        {Object.keys(policies).map((policy) => {
          const isChecked = user.policy.includes(policy)

          return (
            <div
              className="flex w-full items-center justify-between border-b border-dotted border-zinc-300 py-2"
              key={'policy-' + policy}
            >
              <span>{policies[policy]}</span>

              <Switch
                checked={isChecked || userIsSuperAdmin}
                disabled={userIsSuperAdmin || updateUserMutation.isPending}
                onCheckedChange={() =>
                  updateUserMutation.mutate({
                    method: isChecked ? 'remove' : 'insert',
                    policy,
                  })
                }
              />
            </div>
          )
        })}

        {!userIsSuperAdmin && (
          <DeleteUserDialog
            user={user}
            open={shouldShowModal}
            setOpen={setShouldShowModal}
          >
            <Button variant="danger" className="ml-auto mt-6 gap-2 text-xs">
              <Trash size={20} className="stroke-white" />
              Remover permissão de adm
            </Button>
          </DeleteUserDialog>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
