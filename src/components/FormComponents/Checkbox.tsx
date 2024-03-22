import { ComponentProps } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface CheckboxProps extends ComponentProps<'input'> {
  label: string
  register?: UseFormRegisterReturn<string>
}

export function Checkbox({ label, id, register, ...props }: CheckboxProps) {
  return (
    <div className="flex cursor-pointer items-center justify-start gap-2">
      <input
        type="checkbox"
        id={id}
        {...register}
        {...props}
        className="h-5 w-5 cursor-pointer rounded border-zinc-300 checked:bg-orange-500 checked:hover:bg-orange-600 checked:focus:bg-orange-500 dark:border-zinc-500"
      />

      <label htmlFor={id} className="text-base text-gray-700">
        {label}
      </label>
    </div>
  )
}
