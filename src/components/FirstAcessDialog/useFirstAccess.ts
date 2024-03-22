'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  CreateFirstAcccessFormSchemaType,
  createFirstAcccessFormSchema,
} from './createFirstAcessFormSchema'

import { FirebaseAuth } from '@/lib/firebase/auth'
import { UserService } from '@/lib/firebase/database/user-service'
import { useUserContext } from '@/contexts/UserContext'
import { toast } from 'react-toastify'
import { UserType } from '@/@types/Database'
import { profileService } from '@/app/(logged)/perfil/services'
import { usersServices } from '@/app/(logged)/usuarios/services'

interface useFirstAccessProps {
  setShouldDisplayFirstAccessDialog: (shouldDisplay: boolean) => void
  user: UserType
}

export function useFirstAcess({
  setShouldDisplayFirstAccessDialog,
  user,
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
    if (data.avatar && typeof data.avatar !== 'string') {
      if (user.avatar) {
        await UserService.deleteImageFromStorage({
          url: user.avatar,
        })
      }

      const { imagePath } = await UserService.uploadFile({
        file: data.avatar,
      })

      data.avatar = imagePath
    }

    try {
      await profileService.update({
        ...currentUser!,
        firstAccess: false,
        name: data.name,
        avatar: data.avatar ?? null,
      })

      refreshUser({
        name: data.name,
        avatar: data.avatar ?? null,
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
