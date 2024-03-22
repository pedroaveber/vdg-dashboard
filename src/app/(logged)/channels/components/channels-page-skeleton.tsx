import { Skeleton } from '@/components/skeleton'

export function ChannelsPageSkeleton() {
  return (
    <div className="my-8 flex w-full max-w-[1200px] flex-col px-4 pb-16">
      <Skeleton className="mb-4 h-5 w-40" />

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>

      <Skeleton className="mb-4 h-5 w-40" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}
