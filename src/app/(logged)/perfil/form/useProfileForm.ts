'use client'

import { useForm } from 'react-hook-form'

import {
  ProfileFormSchema,
  type ProfileFormSchemaType,
} from './ProfileFormSchema'

import { zodResolver } from '@hookform/resolvers/zod'

import { UserService } from '@/lib/firebase/database/user-service'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { useUserContext } from '@/contexts/UserContext'
import { UserType } from '@/@types/Database'
import { profileService } from '../services'

interface UseProfileFormProps {
  user?: UserType
}

export function useProfileForm({ user }: UseProfileFormProps) {
  const router = useRouter()
  const { refreshUser } = useUserContext()

  const {
    watch,
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
  } = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(ProfileFormSchema),
    values: {
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
    },
  })

  async function updateUserProfile(data: ProfileFormSchemaType) {
    if (data.avatar && typeof data.avatar !== 'string') {
      if (user?.avatar) {
        await UserService.deleteImageFromStorage({
          url: user.avatar,
        })
      }

      const imagePath = await UserService.uploadFile({
        file: data.avatar,
      })

      data.avatar = imagePath
    }

    try {
      await profileService.update({
        ...user!,
        ...data,
      })

      toast.success('Perfil atualizado com sucesso')

      refreshUser({
        ...user!,
        ...data,
      })

      router.refresh()
    } catch (error: any) {
      console.log(error)
      toast.error('Erro ao atualizar perfil')
    }
  }

  return {
    watch,
    errors,
    setValue,
    register,
    handleSubmit,
    isSubmitting,
    updateUserProfile,
  }
}
