'use client'

import { ComponentProps, useId } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface CurrencyInputProps extends ComponentProps<'input'> {
  label: string
  errorMessage?: string | null
  register?: UseFormRegisterReturn<string>
}

export function CurrencyInput({
  label,
  register,
  errorMessage = null,
  className,
  ...props
}: CurrencyInputProps) {
  const customId = useId()

  return (
    <div className="w-full space-y-2">
      <label className="block font-medium" htmlFor={customId}>
        {label}
      </label>

      <div
        data-error={!!errorMessage}
        data-readonly={props.readOnly}
        className={twMerge(
          'flex w-full items-center rounded-lg border border-zinc-300 px-3 py-2 text-zinc-500 shadow-sm outline-none focus-within:border-black data-[error=true]:border-red-500 data-[readonly=true]:bg-zinc-200 data-[readonly=true]:opacity-75 dark:border-zinc-500 dark:data-[readonly=true]:bg-zinc-700',
          className,
        )}
      >
        <span className="mr-4 block text-xs">R$</span>

        <input
          id={customId}
          data-readonly={props.readOnly}
          className="ring-none w-full flex-1 border-none bg-transparent text-right text-zinc-700 shadow-none outline-none placeholder:text-zinc-400 data-[readonly=true]:cursor-default dark:text-zinc-50 dark:data-[readonly=true]:text-zinc-400"
          {...register}
          {...props}
        />
      </div>

      {errorMessage && (
        <p className="text-xs font-medium text-red-400">{errorMessage}</p>
      )}
    </div>
  )
}
