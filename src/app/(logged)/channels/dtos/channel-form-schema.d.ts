import { z } from 'zod'
import { createChannelFormSchema } from '../validators/channel-form-schema'

export type ChannelFormSchemaType = z.infer<typeof createChannelFormSchema>
