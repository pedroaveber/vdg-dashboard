import { Skeleton } from '@/components/skeleton'

export function FeedPageSkeleton() {
  return (
    <>
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <Skeleton className="h-[32px] w-[350px]" />
        <Skeleton className="h-[40px] w-[200px]" />
      </div>

      <div className="mt-8 grid w-full grid-cols-1 gap-4 xl:grid-cols-2">
        <Skeleton className="h-[60px]" />
        <Skeleton className="h-[60px]" />
        <Skeleton className="h-[60px]" />
        <Skeleton className="h-[60px]" />
      </div>
    </>
  )
}
