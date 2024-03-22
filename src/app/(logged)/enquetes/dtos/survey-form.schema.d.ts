import { z } from 'zod'
import { createSurveyFormSchema } from '../validators/survey-form-schema'

export type SurveyFormSchema = z.infer<typeof createSurveyFormSchema>
