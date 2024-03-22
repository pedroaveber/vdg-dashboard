import { z } from 'zod'
import { createCovenantFormSchema } from '../validators/covenant-form-schema'

export type CovenantFormSchemaType = z.infer<typeof createCovenantFormSchema>
