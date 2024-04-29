'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  CreateFirstAcccessFormSchemaType,
  createFirstAcccessFormSchema,
} from './createFirstAcessFormSchema'

import { FirebaseAuth } from '@/lib/firebase/auth'
import { useUserContext } from '@/contexts/UserContext'
import { toast } from 'react-toastify'
import { UserType } from '@/@types/Database'
import { profileService } from '@/app/(logged)/perfil/services'

interface useFirstAccessProps {
  setShouldDisplayFirstAccessDialog: (shouldDisplay: boolean) => void
  user: UserType
}

export function useFirstAcess({
  setShouldDisplayFirstAccessDialog,
}: useFirstAccessProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateFirstAcccessFormSchemaType>({
    resolver: zodResolver(createFirstAcccessFormSchema),
  })

  const { refreshUser, currentUser } = useUserContext()

  async function handleChangeUserInfo(data: CreateFirstAcccessFormSchemaType) {
    try {
      await FirebaseAuth.updateUserPassword(data.password)

      await profileService.update({
        ...currentUser!,
        firstAccess: false,
      })

      refreshUser({
        firstAccess: false,
      })

      setShouldDisplayFirstAccessDialog(false)
      toast.success('Dados atualizados com sucesso!')
    } catch (error) {
      console.log(error)
    }
  }

  return {
    register,
    errors,
    isSubmitting,
    handleSubmit,
    setValue,
    handleChangeUserInfo,
  }
}
