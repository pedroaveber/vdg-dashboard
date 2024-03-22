// Libs
import * as z from 'zod'

// Schema
import { createBannerFormSchema } from '../validators/banner-form-schema'

export type BannerFormSchemaType = z.infer<typeof createBannerFormSchema>
