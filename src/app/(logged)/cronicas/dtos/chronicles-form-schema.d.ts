import { z } from 'zod'
import { createChroniclesFormSchema } from '../validators/chronicles-form-schema'

export type ChroniclesTypeFormSchema = z.infer<
  typeof createChroniclesFormSchema
>
