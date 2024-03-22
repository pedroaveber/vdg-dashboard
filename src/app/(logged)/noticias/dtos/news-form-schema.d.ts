import { z } from 'zod'
import { createNewsFormSchema } from '../validators/news-form-schema'

export type NewsFormSchema = z.infer<typeof createNewsFormSchema>
