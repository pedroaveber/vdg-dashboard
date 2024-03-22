'use client'

import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const buttonVariantios = tv({
  base: 'rounded-md py-2 text-sm md:text-base px-4 transition-colors visible-focus:outline-none disabled:opacity-50 disabled:cursor-auto flex gap-4 items-center justify-start',
  variants: {
    variant: {
      primary:
        'bg-zinc-700 text-white dark:bg-zinc-600 dark:text-white dark:hover:bg-zinc-700 hover:bg-zinc-800',
      secondary:
        'bg-white dark:bg-zinc-900 text-orange-500 shadow-sm enabled:hover:bg-zinc-50 border-2 border-orange-500',
      ghost:
        'bg-transparent text-zinc-700 hover:bg-zinc-100 px-2 dark:hover:bg-zinc-700/50 dark:text-zinc-50 data-[ttactive=true]:bg-zinc-100 dark:data-[ttactive=true]:bg-zinc-700',
      outline:
        'bg-transparent text-zinc-700 border border-zinc-300 dark:text-zinc-50 dark:border-zinc-500 font-bold enabled:hover:bg-zinc-100 enabled:dark:hover:bg-zinc-800',
      danger: 'bg-red-500 text-white shadow-sm enabled:hover:bg-red-600',
      'danger-variation':
        'bg-transparent text-red-500 hover:bg-red-50 px-2 py-1 dark:hover:bg-red-700 dark:text-red-50',
      'danger-outline':
        'bg-transparent text-red-500 border-2 hover:bg-red-50 dark:text-red-500 dark:hover:bg-zinc-800 border-red-500',
    },
    widthType: {
      full: 'w-full',
      regular: 'w-auto',
    },
  },
  defaultVariants: {
    variant: 'primary',
    widthType: 'regular',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariantios>

export function Button({
  variant,
  widthType,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={buttonVariantios({ variant, widthType, className })}
      {...props}
    />
  )
}
