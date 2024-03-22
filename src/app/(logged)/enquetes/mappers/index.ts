import { SurveyType } from '@/@types/Database'
import { SurveyFormSchema } from '../dtos/survey-form.schema'
import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'

export function createSurveyMapper(data: SurveyFormSchema): SurveyType {
  const survey: SurveyType = {
    ...data,
    createdAt: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
    timestamp: new Date().getTime(),
    id: uuid(),
    validityDate: format(data.validityDate, 'dd/MM/yyyy HH:mm:ss'),
  }

  return survey
}
