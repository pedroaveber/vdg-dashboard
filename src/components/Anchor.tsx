'use client'

import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const anchorVariations = tv({
  base: 'flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-sm md:text-base  font-bold transition-colors',
  variants: {
    variant: {
      primary:
        'bg-zinc-700 text-white dark:bg-zinc-600 dark:text-white dark:hover:bg-zinc-700 hover:bg-zinc-800',
      ghost: 'bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-700',
      outline:
        'bg-transparent text-zinc-700 dark:text-zinc-50 border border-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 dark:border-zinc-500',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type AnchorProps = ComponentProps<'a'> & VariantProps<typeof anchorVariations>

export function Anchor({ variant, className, ...props }: AnchorProps) {
  return <a {...props} className={anchorVariations({ variant, className })} />
}
