// Utils
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'

// Types
import { Optional } from '@/@types/Optional'
import type { ChannelType } from '@/@types/Database'

type CreateChannelMapperProps = Optional<
  ChannelType,
  'id' | 'createdAt' | 'timestamp'
>

export function createChannelMapper(
  data: CreateChannelMapperProps,
): ChannelType {
  const channel: ChannelType = {
    createdAt: data.createdAt ?? format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
    timestamp: data.timestamp ?? new Date().getTime(),
    id: data.id ?? uuid(),
    ...data,
  }

  return channel
}
