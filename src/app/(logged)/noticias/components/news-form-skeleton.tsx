import { Skeleton } from '@/components/skeleton'

export function NewsFormSkeleton() {
  return (
    <div className="w-full space-y-4 pb-24">
      <Skeleton className="ml-auto h-[32px] w-[100px]" />
      <Skeleton className="h-[40px]" />
      <Skeleton className="h-[40px]" />
      <Skeleton className="h-[40px]" />

      <Skeleton className="h-[250px]" />
      <Skeleton className="h-[250px]" />

      <div className="flex items-center justify-end gap-2">
        <Skeleton className="h-[40px] w-[100px]" />
        <Skeleton className="h-[40px] w-[200px]" />
      </div>
    </div>
  )
}
