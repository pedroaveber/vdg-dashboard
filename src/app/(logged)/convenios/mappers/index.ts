// Utils
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'

// Types
import { Optional } from '@/@types/Optional'
import type { CovenantType } from '@/@types/Database'

type CreateCovenantMapperProps = Optional<
  CovenantType,
  'id' | 'createdAt' | 'timestamp'
>

export function createCovenantMapper(
  data: CreateCovenantMapperProps,
): CovenantType {
  const covenant: CovenantType = {
    createdAt: data.createdAt ?? format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
    timestamp: data.timestamp ?? new Date().getTime(),
    id: data.id ?? uuid(),
    ...data,
  }

  return covenant
}
