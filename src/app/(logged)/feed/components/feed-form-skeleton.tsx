import { Skeleton } from '@/components/skeleton'

export function FeedFormSkeleton() {
  return (
    <div className="w-full space-y-4 pb-24">
      <Skeleton className="h-[70px]" />
      <Skeleton className="h-[70px]" />
      <Skeleton className="h-[250px]" />

      <div className="grid w-full grid-cols-2 gap-4">
        <Skeleton className="h-[120px] w-full" />
        <Skeleton className="h-[120px] w-full" />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Skeleton className="h-[40px] w-[100px]" />
        <Skeleton className="h-[40px] w-[200px]" />
      </div>
    </div>
  )
}
