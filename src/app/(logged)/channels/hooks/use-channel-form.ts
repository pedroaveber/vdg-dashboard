'use client'

import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useChannels } from './use-channel'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createChannelFormSchema } from '../validators/channel-form-schema'
import type { ChannelType } from '@/@types/Database'
import type { ChannelFormSchemaType } from '../dtos/channel-form-schema'
import { createChannelMapper } from '../mappers'
import { channelServices } from '../services'
import { ChannelsService } from '@/lib/firebase/database/channels-service'
import { zodResolver } from '@hookform/resolvers/zod'

interface UseChannelFormProps {
  prevValues?: ChannelType | null
}

export function useChannelForm({ prevValues = null }: UseChannelFormProps) {
  const router = useRouter()

  const queryClient = useQueryClient()

  const { mutateAsync: insertChannelFn } = useMutation({
    mutationFn: async (data: ChannelType) => {
      channelServices.create(data)
    },
    onError: () => {
      toast.error('Erro ao salvar o canal')
    },
    onSuccess: () => {
      router.push('/channels')
      toast.success('Canal salvo com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['channels-general'] })
    },
  })

  const { mutateAsync: updateChannelFn } = useMutation({
    mutationFn: async (data: ChannelType) => {
      channelServices.update(data)
    },
    onError: () => {
      toast.error('Erro ao atualizar o canal')
    },
    onSuccess: () => {
      router.push('/channels')
      toast.success('Canal atualizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['channels-general'] })
    },
  })

  const { getAmountInLocalStorage } = useChannels()

  const defaultValues: ChannelFormSchemaType = {
    name: prevValues?.name ?? '',
    link: prevValues?.link ?? '',
    type: prevValues?.type ?? 'playlist',
    active: true,
    imagePath: prevValues?.imagePath ?? '',
  }

  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ChannelFormSchemaType>({
    resolver: zodResolver(createChannelFormSchema),
    defaultValues,
  })

  async function createOrUpdateChannel(data: ChannelFormSchemaType) {
    if (data.imagePath && typeof data.imagePath !== 'string') {
      if (prevValues?.imagePath) {
        await ChannelsService.deleteImageFromStorage({
          url: prevValues.imagePath,
        })
      }

      const imagePath = await ChannelsService.uploadFile({
        file: data.imagePath,
      })

      data.imagePath = imagePath
    }

    if (prevValues) {
      updateChannelFn({
        ...prevValues,
        ...data,
      })
    } else {
      const { partnersLength, playlistsLength } = getAmountInLocalStorage()

      if (data.type === 'playlist' && playlistsLength >= 8)
        return toast.error('Você já possui 8 playlists cadastradas')

      if (data.type === 'partners' && partnersLength >= 8)
        return toast.error('Você já possui 8 playlists cadastradas')

      insertChannelFn(
        createChannelMapper({
          ...data,
          imagePath: data.imagePath!,
        }),
      )
    }
  }

  return {
    setValue,
    watch,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    defaultValues,
    createOrUpdateChannel,
  }
}
