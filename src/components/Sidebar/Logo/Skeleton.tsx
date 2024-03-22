export function Skeleton() {
  return (
    <div className="hidden h-[80px] w-full items-center justify-start bg-zinc-50 px-4 dark:bg-zinc-800 md:flex">
      <div className="w-full space-y-1">
        <div className="h-3 w-10 animate-pulse rounded bg-zinc-300 dark:bg-zinc-500" />

        <div className="h-8 w-32 animate-pulse rounded bg-zinc-300 dark:bg-zinc-500" />
      </div>
    </div>
  )
}
