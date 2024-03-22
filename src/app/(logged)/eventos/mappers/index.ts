// Utils
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'

// Types
import type { EventType } from '@/@types/Database'

type CreateEventMapperProps = Omit<
  EventType,
  'id' | 'createdAt' | 'timestamp' | 'price' | 'date' | 'validity'
> & {
  date: Date
  validity: Date
  price?: string | null
}

export function createEventMapper(data: CreateEventMapperProps): EventType {
  const event: EventType = {
    ...data,
    date: format(data.date, 'dd/MM/yyyy'),
    validity: format(data.validity, 'dd/MM/yyyy'),
    price: data.price ? Number(data.price.replace(',', '.').trim()) : null,
    createdAt: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
    timestamp: new Date().getTime(),
    id: uuid(),
  }

  return event
}

type UpdateEventMapperProps = Omit<EventType, 'price' | 'date' | 'validity'> & {
  date: Date
  validity: Date
  price?: string | null
}

export function updateEventMapper(data: UpdateEventMapperProps): EventType {
  const event: EventType = {
    ...data,
    date: format(data.date, 'dd/MM/yyyy'),
    validity: format(data.validity, 'dd/MM/yyyy'),
    price: data.price ? Number(data.price.replace(',', '.').trim()) : null,
  }

  return event
}
