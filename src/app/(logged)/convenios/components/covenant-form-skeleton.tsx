import { Skeleton } from '@/components/skeleton'

export function CovenantFormSkeleton() {
  return (
    <div className="w-full space-y-4 pb-24">
      <Skeleton className="ml-auto h-[32px] w-[100px]" />
      <Skeleton className="h-[70px]" />
      <Skeleton className="h-[70px]" />
      <Skeleton className="h-[70px]" />
      <Skeleton className="h-[200px]" />

      <div className="grid w-full grid-cols-2 gap-10">
        <Skeleton className="h-[150px]" />
        <Skeleton className="h-[150px]" />
      </div>

      <Skeleton className="h-[70px]" />
      <Skeleton className="h-[70px]" />

      <div className="flex items-center justify-end gap-2">
        <Skeleton className="h-[40px] w-[100px]" />
        <Skeleton className="h-[40px] w-[200px]" />
      </div>
    </div>
  )
}
