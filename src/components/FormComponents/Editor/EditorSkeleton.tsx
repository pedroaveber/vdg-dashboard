export function EditorSkeleton() {
  return (
    <div className="h-[280px] w-full rounded-lg border border-zinc-300 bg-white dark:border-zinc-500 dark:bg-zinc-900">
      <div className="flex items-center justify-start gap-2 border-b border-zinc-300 px-4 py-2 dark:border-zinc-500">
        <div className="h-4 w-4 animate-pulse rounded bg-zinc-300"></div>
        <div className="h-4 w-4 animate-pulse rounded bg-zinc-300"></div>
        <div className="h-4 w-4 animate-pulse rounded bg-zinc-300"></div>
        <div className="h-4 w-4 animate-pulse rounded bg-zinc-300"></div>
      </div>

      <div className="w-full space-y-2 p-4">
        <div className="h-4 w-full animate-pulse rounded bg-zinc-300"></div>
        <div className="h-4 w-full animate-pulse rounded bg-zinc-300"></div>
      </div>
    </div>
  )
}
