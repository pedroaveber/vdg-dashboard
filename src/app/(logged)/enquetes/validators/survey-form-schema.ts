import { z } from 'zod'

const isTimeValid = (value: string): boolean => {
  const TIME_REGEX = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
  return TIME_REGEX.test(value)
}

export const createSurveyFormSchema = z
  .object({
    question: z.string().nonempty('A pergunta não pode ser vazia'),

    active: z.coerce.boolean().default(true),
    associateFootball: z.coerce.boolean().default(true),

    validityDate: z.date({
      required_error: 'Data da validade da enquete é obrigatória',
      invalid_type_error: 'Data da validade da enquete é inválida',
    }),
    options: z
      .array(
        z.object({
          value: z.string(),
          votes: z.number().optional().default(0),
        }),
        {
          required_error: 'Você deve informar ao menos 2 opções',
        },
      )
      .min(2, 'Mínimo de 2 opções')
      .max(5, 'Máximo de 5 opções'),

    validityHour: z
      .string({ required_error: 'Hora da validade da enquete é obrigatória' })
      .refine(isTimeValid, 'Hora da validade da enquete é inválida'),

    privacy: z
      .enum(['PUBLIC', 'MEMBERS_ONLY', 'VIP_MEMBERS_ONLY', 'REGISTEREDS'])
      .default('PUBLIC'),

    associatedMatchId: z
      .string()
      .nullable()
      .default(null)
      .optional()
      .transform((value) => value || null),
  })
  .superRefine((values, context) => {
    const optionFields = values.options
    const optionsLength = optionFields.length

    optionFields.forEach((option, index) => {
      if (option.value === '' && index !== optionsLength - 1) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['options'],
          message:
            'Você deve informar ao menos duas opções e nenhuma pode ser vazia',
        })
      }
    })

    if (values.associateFootball && !values.associatedMatchId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['associatedMatchId'],
        message:
          'Você deve associar um jogo a esta enquete ou desativar a opção',
      })
    }

    const [hour, minutes] = values.validityHour.split(':')
    const selectedDate = values.validityDate.setHours(
      Number(hour),
      Number(minutes),
      0,
      0,
    )
    const currentDate = new Date()

    if (currentDate > new Date(selectedDate)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['validityDate'],
        message: 'A data de validade não pode ser menor que a data atual',
      })
    }
  })
