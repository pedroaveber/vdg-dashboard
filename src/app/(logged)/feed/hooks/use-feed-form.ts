'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/contexts/UserContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFeedFormSchema } from '../validators/feed-form-schema'
import type { FeedFormSchemaType } from '../dtos/banner-form-schema'
import type { FeedType } from '@/@types/Database'
import { toast } from 'react-toastify'
import { FeedService } from '@/lib/firebase/database/feed-service'
import { feedServices } from '../services'
import { createFeedMapper } from '../mappers'

interface useFeedFormProps {
  prevValues?: FeedType | null
}

export function useFeedForm({ prevValues = null }: useFeedFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { currentUser } = useUserContext()

  const { mutateAsync: updateFeedFn } = useMutation({
    mutationFn: async (data: FeedType) => {
      await feedServices.update(data)
    },
    onError: () => {
      toast.error('Erro ao salvar o feed')
    },
    onSuccess: () => {
      router.push('/feed')
      toast.success('Feed salvo com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['feeds-general'] })
    },
  })

  const { mutateAsync: insertFeedFn } = useMutation({
    mutationFn: async (data: FeedType) => {
      await feedServices.create(data)
    },
    onError: () => {
      toast.error('Erro ao criar o feed')
    },
    onSuccess: () => {
      router.push('/feed')
      toast.success('Feed criado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['feeds-general'] })
    },
  })

  const defaultValues: FeedFormSchemaType = {
    link: prevValues?.link || '',
    active: prevValues?.active || true,
    imagePath: prevValues?.imagePath || null,
    privacy: prevValues?.privacy || 'PUBLIC',
    description: prevValues?.description || '',
    secondaryImagePath: prevValues?.secondaryImagePath || null,
    publishOnWhatsapp: prevValues ? prevValues.publishOnWhatsapp : false,
  }

  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FeedFormSchemaType>({
    resolver: zodResolver(createFeedFormSchema),
    defaultValues,
  })

  async function uploadFiles(data: FeedFormSchemaType) {
    if (data.imagePath && typeof data.imagePath !== 'string') {
      if (prevValues?.imagePath) {
        await FeedService.deleteImageFromStorage({
          url: prevValues.imagePath,
        })
      }

      const imagePath = await FeedService.uploadFile({
        file: data.imagePath,
      })

      data.imagePath = imagePath
    }

    if (
      data.secondaryImagePath &&
      typeof data.secondaryImagePath !== 'string'
    ) {
      if (prevValues?.secondaryImagePath) {
        await FeedService.deleteImageFromStorage({
          url: prevValues.secondaryImagePath,
        })
      }

      const imagePath = await FeedService.uploadFile({
        file: data.secondaryImagePath,
      })

      data.secondaryImagePath = imagePath
    }
  }

  async function saveFeedData(data: FeedFormSchemaType) {
    await uploadFiles(data)

    if (prevValues && prevValues.published) {
      toast.error('Não é possível editar um item publicado')
      return
    }

    prevValues
      ? updateFeedFn({
          ...prevValues,
          ...data,
          published: false,
        })
      : insertFeedFn(
          createFeedMapper(
            {
              ...data,
              published: false,
            },
            {
              avatar: currentUser!.avatar ?? null,
              name: currentUser!.name ?? null,
              id: currentUser!.id,
            },
          ),
        )
  }

  async function saveAndPublishFeedData(data: FeedFormSchemaType) {
    await uploadFiles(data)

    prevValues
      ? updateFeedFn({
          ...prevValues,
          ...data,
          published: true,
        })
      : insertFeedFn(
          createFeedMapper(
            {
              ...data,
              published: true,
            },
            {
              avatar: currentUser!.avatar ?? null,
              name: currentUser!.name ?? null,
              id: currentUser!.id,
            },
          ),
        )
  }

  async function publishData(data: FeedFormSchemaType) {
    updateFeedFn({
      ...prevValues!,
      ...data,
      published: true,
    })
  }

  return {
    watch,
    errors,
    setValue,
    register,
    publishData,
    handleSubmit,
    isSubmitting,
    saveFeedData,
    defaultValues,
    saveAndPublishFeedData,
  }
}
