'use client'

import * as Dialog from '@radix-ui/react-alert-dialog'
import { Button } from '@/components/FormComponents/Button'
import { FeedType } from '@/@types/Database'

interface FeedReviewDialogProps {
  feed: FeedType
  children: React.ReactNode
}

export function FeedReviewDialog({ feed, children }: FeedReviewDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-300 bg-white p-4 shadow-sm data-[state=open]:animate-contentShow dark:border-zinc-500 dark:bg-zinc-900 md:w-full">
          <Dialog.Description
            className="prose prose-sm my-4 max-h-[300px] overflow-y-auto pr-8 dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: feed.description }}
          />

          <div className="mt-8 flex w-full items-center justify-end gap-2">
            <Dialog.Cancel>
              <Button variant="ghost" className="font-bold">
                Fechar
              </Button>
            </Dialog.Cancel>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
