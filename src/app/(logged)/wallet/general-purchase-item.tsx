import { ArrowUp } from 'lucide-react'
import type { DisplayPurchase } from './presenters'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/UI/avatar'

export function GeneralPurchaseItem(item: DisplayPurchase) {
  console.log('item username -> ', item.username)

  return (
    <div className="flex w-full items-center justify-between rounded-md border border-zinc-300 p-2">
      <div className="flex items-center justify-start gap-2">
        {item.avatar ? (
          <Avatar>
            <AvatarImage src={item.avatar} />
            <AvatarFallback>
              {item.username
                ? item.username
                    .split(' ')
                    .map((item, index) =>
                      index >= 1 ? '' : item[0].toUpperCase(),
                    )
                : 'A'}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-400">
            {item.username ? item.username.substring(0, 1).toUpperCase() : 'A'}
          </div>
        )}

        <div className="space-y-0.5">
          <span className="block text-sm font-semibold">
            {item.username ? item.username : 'Anônimo'}
          </span>
          <span className="block text-xs font-thin">{item.email}</span>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2 text-emerald-500">
        <ArrowUp className="h-4 w-4" />

        <span className="text-sm font-semibold">{item.price}</span>
      </div>
    </div>
  )
}
