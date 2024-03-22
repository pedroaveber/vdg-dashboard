import { twMerge } from 'tailwind-merge'
import { Loader2 } from 'lucide-react'

interface ButtonSpinnerProps {
  className?: string | null
}

export function ButtonSpinner({ className = null }: ButtonSpinnerProps) {
  return (
    <Loader2
      size={22}
      className={twMerge('mx-auto animate-spin stroke-white', className)}
    />
  )
}
