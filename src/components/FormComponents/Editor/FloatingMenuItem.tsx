import Image, { StaticImageData } from 'next/image'
import { ComponentProps } from 'react'

interface FloatingMenuItemProps extends ComponentProps<'button'> {
  itemTitle: string
  description: string
  src: StaticImageData
}

export function FloatingMenuItem({
  itemTitle,
  description,
  src,
  ...props
}: FloatingMenuItemProps) {
  return (
    <button
      {...props}
      className="flex w-full items-center justify-start gap-2 px-2 py-1 data-[ttactive=true]:bg-zinc-100 hover:bg-zinc-50 data-[ttactive=true]:hover:bg-zinc-200 dark:data-[ttactive=true]:bg-zinc-700 dark:hover:bg-zinc-800 dark:data-[ttactive=true]:hover:bg-zinc-800"
    >
      <Image
        src={src}
        alt="Text"
        width={50}
        height={50}
        className="rounded border border-zinc-300 bg-white object-cover dark:border-zinc-500"
      />

      <div className="flex flex-col items-start text-left">
        <span className="text-sm">{itemTitle}</span>
        <span className="text-xs">{description}</span>
      </div>
    </button>
  )
}
