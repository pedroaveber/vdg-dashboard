// Utils
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'

// Types
import { Optional } from '@/@types/Optional'
import type { NewsType } from '@/@types/Database'

type CreateNewsMapperProps = Optional<
  NewsType,
  'id' | 'createdAt' | 'timestamp' | 'author'
>

type User = {
  id: string
  name?: string | null
  avatar?: string | null
}

export function createNewsMapper(
  data: CreateNewsMapperProps,
  user: User,
): NewsType {
  const news: NewsType = {
    createdAt: data.createdAt ?? format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
    timestamp: data.timestamp ?? new Date().getTime(),
    id: data.id ?? uuid(),

    author: {
      id: user.id,
      name: user.name ?? null,
      avatar: user.avatar ?? null,
    },
    ...data,
  }

  return news
}
