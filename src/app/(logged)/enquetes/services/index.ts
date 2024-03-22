import { SurveyType } from '@/@types/Database'
import { Services } from '@/infra/services'

export const surveyServices = new Services<SurveyType>('surveys')
