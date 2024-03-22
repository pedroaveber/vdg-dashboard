'use client'

import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { UserManagementFormSchema } from '../dtos/user-management-form-schema'
import { createUserManagementFormSchema } from '../validators/user-management-form-schema'

import { toast } from 'react-toastify'
import { UserType } from '@/@types/Database'
import { usersServices } from '../services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUserMapper } from '../mappers'

export function useUserManagement() {
  const [open, setOpen] = useState(false)
  const [temporaryPassword, setTemporaryPassword] = useState('')
  const [existentUser, setExistentUser] = useState<null | UserType>(null)
  const [hasCopied, setHasCopied] = useState(false)
  const [hasChangedUserRole, setHasChangedUserRole] = useState(false)

  const queryClient = useQueryClient()

  const defaultValues: UserManagementFormSchema = {
    email: '',
    policy: [],
  }

  const createUserMutation = useMutation({
    mutationFn: async (data: UserType) => usersServices.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-general'] })
      toast.success('Usuário criado com sucesso!')
    },
    onError: () => {
      toast.error('Algo deu errado, tente novamente mais tarde')
    },
  })

  const updateUserMutation = useMutation({
    mutationFn: async (data: UserType) => usersServices.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-general'] })
      setOpen(false)
      handleResetDialog()
      toast.success('Usuário criado com sucesso!')
    },
    onError: () => {
      toast.error('Algo deu errado, tente novamente mais tarde')
    },
  })

  const methods = useForm<UserManagementFormSchema>({
    resolver: zodResolver(createUserManagementFormSchema),
    defaultValues,
  })

  function handleCopyTemporaryPassword() {
    navigator.clipboard.writeText(temporaryPassword)
    setHasCopied(true)
  }

  async function handleCreateUser(data: UserManagementFormSchema) {
    const userAlreadyExists = await usersServices.getUserByEmail({
      email: data.email,
    })

    if (
      userAlreadyExists &&
      ['super-admin', 'admin'].includes(userAlreadyExists.role)
    ) {
      toast.error('Usuário já existe')
      return
    }

    if (userAlreadyExists && userAlreadyExists.role === 'user') {
      await updateUserMutation.mutateAsync({
        ...userAlreadyExists,
        role: 'admin',
        policy: data.policy,
        firstAccess: false,
      })

      return
    }

    const { email, id, password } = await usersServices.createAdminUser({
      email: data.email,
    })

    await createUserMutation.mutateAsync(
      createUserMapper({
        email,
        id,
        policy: data.policy,
        role: 'admin',
      }),
    )
    setTemporaryPassword(password)
  }

  function handleResetDialog() {
    methods.reset()

    setTemporaryPassword('')
    setExistentUser(null)
    setHasCopied(false)
    setHasChangedUserRole(false)
  }

  return {
    ...methods,
    open,
    setOpen,
    hasCopied,
    existentUser,
    handleCreateUser,
    handleResetDialog,
    temporaryPassword,
    hasChangedUserRole,
    handleCopyTemporaryPassword,
    isUpdatingUser: createUserMutation.isPending,
  }
}
