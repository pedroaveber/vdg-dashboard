'use client'

import Image from 'next/image'

import { ComponentProps, useId, useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'

import { tv, VariantProps } from 'tailwind-variants'

const fileInputVariants = tv({
  base: 'group relative flex w-full cursor-pointer items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-500 shadow-sm',
  variants: {
    aspectRatio: {
      banner: 'aspect-banner',
      event: 'h-[463px]',
      sponsor: 'h-[463px]',
      news: 'aspect-news',
    },
  },
  defaultVariants: {
    aspectRatio: 'event',
  },
})

type FileInputProps = ComponentProps<'input'> &
  VariantProps<typeof fileInputVariants> & {
    label: string
    setImagePreview: (previewUrl: File | string) => void
    imagePreview?: string | null
    errorMessage?: string | null | undefined
    customDescription?: string | null
    inputSize?: 'REGULAR' | 'SMALL'
  }

export function FileInput({
  label,
  setImagePreview,
  errorMessage = null,
  imagePreview = null,
  customDescription = null,
  aspectRatio,
  className,
  inputSize = 'REGULAR',
  ...props
}: FileInputProps) {
  const customId = useId()
  const [file, setFile] = useState<string | null>(imagePreview || null)

  function createPreviewUrl(filelist: FileList | null) {
    if (!filelist) return

    if (filelist[0] && typeof filelist[0] !== 'string') {
      const previewUrl = filelist[0]
      const reader = new FileReader()

      reader.onload = () => {
        setFile(reader.result as string)
      }

      setImagePreview(filelist[0])
      reader.readAsDataURL(previewUrl)
    }
  }

  return (
    <div className="w-full space-y-2">
      <label className="block font-medium" htmlFor={customId}>
        {label}
      </label>

      {inputSize === 'REGULAR' ? (
        <label
          data-preview={!!file}
          className={fileInputVariants({ aspectRatio, className })}
          htmlFor={customId}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex flex-col items-center justify-center group-data-[preview=true]:opacity-0 group-data-[preview=true]:hover:opacity-100">
            <ImageIcon
              strokeWidth={1.5}
              data-type={aspectRatio}
              className="peer stroke-gray-300 data-[type=banner]:hidden group-data-[preview=true]:stroke-zinc-50 md:data-[type=banner]:block"
              size={32}
            />

            <span className="mt-2 block text-sm font-medium text-zinc-500 group-data-[preview=true]:text-white peer-data-[type=banner]:m-0 dark:text-zinc-300 md:peer-data-[type=banner]:mt-2">
              Carregar imagem (upload)
            </span>

            <span className="mt-1 block text-xs text-zinc-400 group-data-[preview=true]:text-zinc-50">
              {customDescription || 'PNG ou JPG até 2MB'}
            </span>
          </div>

          {file && (
            <Image
              fill
              src={file}
              className="absolute inset-0 z-10 rounded-lg object-cover duration-300 group-hover:brightness-50"
              alt=""
            />
          )}

          <input
            type="file"
            className="sr-only"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={(event) => createPreviewUrl(event.target.files)}
            {...props}
            id={customId}
          />
        </label>
      ) : (
        <label
          data-preview={!!file}
          className={fileInputVariants({ aspectRatio, className })}
          htmlFor={customId}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex flex-col items-center justify-center group-data-[preview=true]:opacity-0 group-data-[preview=true]:hover:opacity-100">
            <ImageIcon
              strokeWidth={1.5}
              data-type={aspectRatio}
              className="peer stroke-gray-300 data-[type=banner]:hidden group-data-[preview=true]:stroke-zinc-50 md:data-[type=banner]:block"
              size={32}
            />

            <span className="mt-2 block text-sm font-medium text-zinc-500 group-data-[preview=true]:text-white peer-data-[type=banner]:m-0 dark:text-zinc-300 md:peer-data-[type=banner]:mt-2">
              upload
            </span>

            <span className="mt-1 block text-xs text-zinc-400 group-data-[preview=true]:text-zinc-50">
              {customDescription || 'PNG ou JPG até 2MB'}
            </span>
          </div>

          {file && (
            <Image
              fill
              src={file}
              className="absolute inset-0 z-10 rounded-lg object-cover duration-300 group-hover:brightness-50"
              alt=""
            />
          )}

          <input
            type="file"
            className="sr-only"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            onChange={(event) => createPreviewUrl(event.target.files)}
            {...props}
            id={customId}
          />
        </label>
      )}

      {errorMessage && (
        <p className="text-xs font-bold text-red-400">{errorMessage}</p>
      )}
    </div>
  )
}
