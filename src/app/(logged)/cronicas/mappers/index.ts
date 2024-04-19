import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import { Optional } from '@/@types/Optional'
import type { ChroniclesType } from '@/@types/Database'

type CreateChroniclesMapperProps = Optional<
  ChroniclesType,
  'id' | 'createdAt' | 'timestamp' | 'active'
>

export function createChroniclesMapper(
  data: CreateChroniclesMapperProps,
): ChroniclesType {
  const chronicles: ChroniclesType = {
    createdAt: data.createdAt ?? format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
    timestamp: data.timestamp ?? new Date().getTime(),
    active: data.active ?? true,
    id: data.id ?? uuid(),
    ...data,
  }

  return chronicles
}
