'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Star } from 'lucide-react'
import type { BannerType } from '@/@types/Database'
import { Anchor } from '@/components/Anchor'
import { Switch } from '@/components/UI/switch'
import { Button } from '@/components/FormComponents'
import { ButtonSpinner } from '@/components/ButtonSpinner'
import { BannerDeleteDialog } from './banner-delete-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bannerService } from '../services'
import { toast } from 'react-toastify'

interface BannerItemProps {
  banner: BannerType
  disabled: boolean
}

export function BannerItem({ banner, disabled }: BannerItemProps) {
  const queryClient = useQueryClient()

  const [shouldShowDialog, setShouldShowDialog] = useState(false)

  // Toggle banner active status
  const { mutateAsync: toggleBannerStatusFn } = useMutation({
    mutationFn: async () => {
      await bannerService.update({
        ...banner,
        active: !banner.active,
      })
    },
    onMutate: () => {
      const cached = queryClient.getQueryData<BannerType[]>(['banners-general'])
      queryClient.setQueryData(['banners-general'], (prev: BannerType[]) => {
        return prev.map((item) => {
          if (item.id === banner.id) return { ...item, active: !item.active }
          return item
        })
      })
      return cached
    },
    onError: (_, __, cached) => {
      queryClient.setQueryData(['banners-general'], cached)
      toast.error('Erro ao atualizar status do banner')
    },
  })

  // Toggle banner highlight status
  const { mutateAsync: toggleBannerHighlightFn } = useMutation({
    mutationFn: async () => {
      await bannerService.update({
        ...banner,
        highlighted: !banner.highlighted,
      })
    },
    onMutate: () => {
      const cached = queryClient.getQueryData<BannerType[]>(['banners-general'])
      queryClient.setQueryData(['banners-general'], (old: BannerType[]) => {
        return old.map((item) => {
          if (item.id === banner.id)
            return { ...item, highlighted: !item.highlighted }
          return item
        })
      })
      return cached
    },
    onError: (_, __, cached) => {
      queryClient.setQueryData(['banners-general'], cached)
      toast.error('Erro ao atualizar status do banner')
    },
  })

  return (
    <div
      key={banner.id}
      className="dflex flex-col gap-2 rounded-lg border border-zinc-300 p-2 dark:border-zinc-500 md:p-4"
    >
      <Image
        alt="Imagem do documento"
        src={banner.imagePath}
        width={400}
        height={400}
        data-type={'banner'}
        className="h-[200px] w-full object-cover data-[type=banner]:h-[60px] md:hidden"
      />

      <div className="flex w-full flex-col md:flex-row md:items-center md:gap-4">
        <div className="flex w-full items-center gap-2">
          <button
            onClick={() => toggleBannerHighlightFn()}
            disabled={banner.highlighted ? false : disabled}
            className="disabled:opacity-25"
          >
            <Star
              data-selected={banner.highlighted}
              size={20}
              className="stroke-zinc-500 data-[selected=true]:fill-yellow-400 data-[selected=true]:stroke-yellow-400"
            />
          </button>
          <span className="text-lg font-bold md:w-[150px] md:truncate md:text-base">
            {banner.title}
          </span>
        </div>

        <div className="flex w-full items-center justify-between gap-2 py-4 md:justify-end md:py-0">
          <span>Ativar banner</span>

          <Switch
            onCheckedChange={() => toggleBannerStatusFn()}
            checked={banner.active}
          />
        </div>

        <div className="w-full space-y-2">
          <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-end">
            <Anchor
              href={'banners/editar/' + banner.id}
              variant="outline"
              className="flex w-full items-center justify-center px-2 py-2 text-base md:w-auto md:py-1 md:text-sm"
            >
              Editar
            </Anchor>

            <BannerDeleteDialog
              open={shouldShowDialog}
              setOpen={setShouldShowDialog}
              id={banner.id}
            >
              <Button
                variant="danger"
                widthType="full"
                className="flex items-center justify-center gap-1 py-2  text-base font-bold md:w-auto md:py-1 md:text-sm"
              >
                Excluir
              </Button>
            </BannerDeleteDialog>
          </div>
        </div>
      </div>
    </div>
  )
}
