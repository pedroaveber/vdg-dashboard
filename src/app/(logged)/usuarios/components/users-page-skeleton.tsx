import { Skeleton } from '@/components/skeleton'

export function UsersPageSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
      <Skeleton className="h-[80px]" />
      <Skeleton className="h-[80px]" />
      <Skeleton className="h-[80px]" />
      <Skeleton className="h-[80px]" />
      <Skeleton className="h-[80px]" />
    </div>
  )
}
