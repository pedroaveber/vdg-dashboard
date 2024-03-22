import { Skeleton } from '@/components/skeleton'

export function ChannelFormSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4 pb-24">
      <div className="mb-8 grid w-full grid-cols-2 gap-2">
        <Skeleton className="h-[50px] w-full" />
        <Skeleton className="h-[50px] w-full" />
      </div>

      <Skeleton className="h-[70px] w-full" />
      <Skeleton className="h-[70px] w-full" />

      <Skeleton className="h-[120px] w-[120px]" />

      <div className="flex flex-col items-center justify-end gap-2 md:flex-row">
        <Skeleton className="h-[40px] w-full md:w-[200px]" />
        <Skeleton className="h-[40px] w-full md:w-[200px]" />
      </div>
    </div>
  )
}
