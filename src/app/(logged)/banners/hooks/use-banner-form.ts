'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createBannerFormSchema } from '../validators/banner-form-schema'
import type { BannerFormSchemaType } from '../dtos/banner-form-schema'
import { toast } from 'react-toastify'
import type { BannerType } from '@/@types/Database'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bannerService } from '../services'
import { createBannerMapper } from '../mappers'
import { BannerService } from '@/lib/firebase/database/banners-service'

interface UseBannerFormProps {
  prevValues?: BannerType | null
}

export function useBannerForm({ prevValues = null }: UseBannerFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync: insertBannerFn } = useMutation({
    mutationFn: async (data: BannerType) => {
      bannerService.create(data)
    },
    onError: () => {
      toast.error('Erro ao salvar o banner')
    },
    onSuccess: () => {
      router.push('/banners')
      toast.success('Banner salvo com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['banners-general'] })
    },
  })

  const { mutateAsync: updateBannerFn } = useMutation({
    mutationFn: async (data: BannerType) => {
      bannerService.update(data)
    },
    onError: () => {
      toast.error('Erro ao salvar o banner')
    },
    onSuccess: () => {
      router.push('/banners')
      toast.success('Banner salvo com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['banners-general'] })
    },
  })

  const defaultValues = {
    link: prevValues?.link || '',
    title: prevValues?.title || '',
    active: prevValues?.active || true,
    imagePath: prevValues?.imagePath || null,
  }

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BannerFormSchemaType>({
    resolver: zodResolver(createBannerFormSchema),
    defaultValues,
  })

  async function submitBannerForm(data: BannerFormSchemaType) {
    if (data.imagePath && typeof data.imagePath !== 'string') {
      if (prevValues?.imagePath) {
        await BannerService.deleteImageFromStorage({
          url: prevValues.imagePath,
        })
      }

      const imagePath = await BannerService.uploadFile({
        file: data.imagePath,
      })
      data.imagePath = imagePath
    }

    prevValues
      ? updateBannerFn({
          ...prevValues,
          ...data,
        })
      : insertBannerFn(createBannerMapper(data))
  }

  return {
    watch,
    errors,
    setValue,
    register,
    handleSubmit,
    isSubmitting,
    defaultValues,
    submitBannerForm,
  }
}
