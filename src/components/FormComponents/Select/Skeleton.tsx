export function Skeleton() {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="h-5 w-20 animate-pulse rounded-md bg-zinc-400 dark:bg-zinc-300" />
      <div className="h-10 w-full animate-pulse rounded-md bg-zinc-400 dark:bg-zinc-300" />
    </div>
  )
}
