import { endOfDay, endOfToday, isAfter, isBefore, startOfDay } from 'date-fns'
import { z } from 'zod'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

const URL_PATTERN =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\S*)$/

const isTimeValid = (value: string): boolean => {
  const TIME_REGEX = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
  return TIME_REGEX.test(value)
}

export const createEventFormSchema = z
  .object({
    title: z
      .string()
      .min(3, 'Mínimo de 3 caracteres')
      .max(50, 'Máximo de 50 caracteres')
      .nonempty('Título é obrigatório'),

    active: z.coerce.boolean().default(false),

    privacy: z
      .enum(['PUBLIC', 'MEMBERS_ONLY', 'VIP_MEMBERS_ONLY', 'REGISTEREDS'])
      .default('VIP_MEMBERS_ONLY'),

    local: z
      .string({
        required_error: 'Local do Evento é obrigatório',
      })
      .min(3, 'Mínimo de 3 caracteres'),

    link: z.string().nullable().default(null).optional(),

    description: z
      .string({
        required_error: 'Texto da Notícia é obrigatório',
      })
      .min(3, 'Mínimo de 3 caracteres')
      .max(5000, 'Máximo de 5000 caracteres'),

    date: z.date({
      required_error: 'Data do Evento é obrigatória',
      invalid_type_error: 'Data do Evento é inválida',
    }),

    hour: z
      .string({ required_error: 'Hora do Evento é obrigatória' })
      .refine(isTimeValid, 'Hora do Evento é inválida'),

    validity: z.date({
      required_error: 'Data do Evento é obrigatória',
      invalid_type_error: 'Data do Evento é inválida',
    }),

    subtitle: z.string().nullable().default(null).optional(),
    alertMessage: z.string().nullable().default(null).optional(),

    // Address fields
    address: z.string().nullable().default(null).optional(),
    number: z.string().nullable().default(null).optional(),
    complement: z.string().nullable().default(null).optional(),
    neighborhood: z.string().nullable().default(null).optional(),
    city: z.string().nullable().default(null).optional(),
    state: z.string().nullable().default(null).optional(),
    zipcode: z.string().nullable().default(null).optional(),

    paymentManagement: z.coerce.boolean().default(false),
    price: z.string().nullable().default(null).optional(),

    imagePath: z.any(),
    backgroundImagePath: z.any(),
  })
  .superRefine((data, ctx) => {
    if (data.link && !URL_PATTERN.test(data.link)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Link inválido',
        path: ['link'],
      })
    }

    if (data.imagePath && typeof data.imagePath !== 'string') {
      if (data.imagePath && data.imagePath.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: 'custom',
          message: 'Imagem muito grande',
          path: ['imagem'],
        })
      }

      if (data.imagePath && !ALLOWED_FILE_TYPES.includes(data.imagePath.type)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Tipo de arquivo não permitido',
          path: ['imagem'],
        })
      }
    }

    if (
      data.backgroundImagePath &&
      typeof data.backgroundImagePath !== 'string'
    ) {
      if (
        data.backgroundImagePath &&
        data.backgroundImagePath.size > MAX_FILE_SIZE
      ) {
        ctx.addIssue({
          code: 'custom',
          message: 'Imagem muito grande',
          path: ['backgroundImagePath'],
        })
      }

      if (
        data.backgroundImagePath &&
        !ALLOWED_FILE_TYPES.includes(data.backgroundImagePath.type)
      ) {
        ctx.addIssue({
          code: 'custom',
          message: 'Tipo de arquivo não permitido',
          path: ['backgroundImagePath'],
        })
      }
    }

    if (data.paymentManagement && !data.price) {
      ctx.addIssue({
        code: 'custom',
        message: 'Informe o preço do evento',
        path: ['price'],
      })
    }

    const eventDate = endOfDay(data.date)
    const eventValidityDate = endOfDay(data.validity)

    if (isBefore(eventDate, endOfToday())) {
      ctx.addIssue({
        code: 'custom',
        message: 'Data do evento não pode ser menor que a data atual',
        path: ['date'],
      })
    }

    if (isAfter(eventValidityDate, eventDate)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Data de validade não pode ser maior que a data do evento',
        path: ['validity'],
      })
    }
  })
