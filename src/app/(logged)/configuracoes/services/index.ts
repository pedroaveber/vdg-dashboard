import { DatabaseCoreType } from '@/@types/Database'
import { Services } from '@/infra/services'

type ConfigurationType = DatabaseCoreType & {
  surveyAlert: boolean
  whatsappAlert: boolean
}

export const configurationsService = new Services<ConfigurationType>(
  'configurations',
)

type GeneralConfigs = {
  access: string
  public: string
}

// export const generalConfigsService = new Services<GeneralConfigs & >(
//   'generalConfigs',
// )
