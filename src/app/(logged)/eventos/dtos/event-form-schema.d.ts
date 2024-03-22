import { z } from 'zod'
import { createEventFormSchema } from '../validators/create-event-form-schema'

export type EventFormSchemaType = z.infer<typeof createEventFormSchema>
