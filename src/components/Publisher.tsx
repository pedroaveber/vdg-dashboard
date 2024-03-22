import { UserType } from '@/@types/Database'
import { User } from 'lucide-react'
import Image from 'next/image'

interface PublisherProps {
  publisher: {
    avatar: string | null
    name: string | null
  }
  createdAt: string
}

export function Publisher({ publisher, createdAt }: PublisherProps) {
  const [date, time] = createdAt.split(' ')
  const [hour, minute] = time.split(':')

  return (
    <div className="flex w-full items-center gap-3">
      <div className="flex items-center justify-start gap-3">
        {publisher.avatar ? (
          <Image
            src={publisher.avatar}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 border-spacing-1 rounded-full border-2 border-zinc-300 object-cover dark:border-zinc-200"
          />
        ) : (
          <figure className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-500 dark:border-zinc-50">
            <User strokeWidth={1.5} />
          </figure>
        )}

        <div className="flex flex-col items-start">
          <span className="text-sm font-bold">{publisher.name}</span>

          <span className="text-xs text-zinc-500 dark:text-zinc-300">
            {date} às {hour}:{minute}
          </span>
        </div>
      </div>
    </div>
  )
}
