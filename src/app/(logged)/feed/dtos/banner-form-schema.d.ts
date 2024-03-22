// Libs
import { z } from 'zod'

// Schema
import { createFeedFormSchema } from '../validators/feed-form-schema'

export type FeedFormSchemaType = z.infer<typeof createFeedFormSchema>
