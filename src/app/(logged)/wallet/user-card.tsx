import { Button } from '@/components/UI/Button'
import type { DisplayUser } from './presenters'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/UI/avatar'
import Link from 'next/link'

export function UserCard(item: DisplayUser) {
  return (
    <div
      className="flex w-full items-center justify-between rounded-md border border-zinc-300 p-2"
      key={item.id}
    >
      <div className="flex items-center justify-start gap-2">
        {item.avatarUrl ? (
          <Avatar>
            <AvatarImage src={item.avatarUrl} />
            <AvatarFallback>
              {item.name
                ? item.name
                    .split(' ')
                    .map((item, index) =>
                      index >= 1 ? '' : item[0].toUpperCase(),
                    )
                : 'A'}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-400">
            {item.name
              ? item.name.split(' ').map((item) => item[0].toUpperCase())
              : 'A'}
          </div>
        )}

        <div className="space-y-0.5">
          <span className="block text-sm font-semibold">
            {item.name ? item.name : 'Anônimo'}
          </span>
          <span className="block text-xs font-thin">{item.email}</span>
        </div>
      </div>

      <Button size="sm" variant="ghost" asChild>
        <Link href={`/wallet/user/${item.id}`}>Ver histórico</Link>
      </Button>
    </div>
  )
}
