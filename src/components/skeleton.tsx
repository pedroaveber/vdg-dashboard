import { twMerge } from 'tailwind-merge'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        'animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-600',
        className,
      )}
    />
  )
}
