import { Skeleton } from '@/components/skeleton'

export function ConfigPageSkeleton() {
  return (
    <div className="flex w-full flex-col items-start gap-8">
      <Skeleton className="h-[40px] w-[400px]" />

      <div className="w-full space-y-4">
        <div className="flex w-full items-center justify-between">
          <Skeleton className="h-[40px] w-[200px]" />
          <Skeleton className="h-[40px] w-[100px]" />
        </div>

        <div className="flex w-full items-center justify-between">
          <Skeleton className="h-[40px] w-[200px]" />
          <Skeleton className="h-[40px] w-[100px]" />
        </div>
      </div>
    </div>
  )
}
