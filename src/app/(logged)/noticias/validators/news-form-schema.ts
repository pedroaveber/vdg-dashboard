import { format, isAfter } from 'date-fns'
import { z } from 'zod'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
]

const URL_PATTERN = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

export const createNewsFormSchema = z
  .object({
    title: z
      .string({
        required_error: 'Titulo da Notícia é obrigatório',
      })
      .min(3, 'Mínimo de 3 caracteres'),
    active: z.coerce.boolean().default(true),
    privacy: z
      .enum(['PUBLIC', 'MEMBERS_ONLY', 'VIP_MEMBERS_ONLY', 'REGISTEREDS'])
      .default('PUBLIC'),
    link: z.string().optional(),
    date: z
      .date()
      .refine(
        (date) => !isAfter(date, new Date()),
        'A data precisa ser menor que a data atual',
      ),
    description: z
      .string({
        required_error: 'Texto da Notícia é obrigatório',
      })
      .min(3, 'Mínimo de 3 caracteres'),

    imagePath: z.any(),
  })
  .superRefine((data, ctx) => {
    if (data.link && data.link !== '' && !URL_PATTERN.test(data.link)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Insira uma URL válida',
        path: ['link'],
      })
    }

    if (!data.imagePath || data.imagePath === '') {
      ctx.addIssue({
        code: 'custom',
        message: 'Insira uma imagem',
        path: ['imagePath'],
      })
    }

    if (data.imagePath && typeof data.imagePath !== 'string') {
      if (data.imagePath && data.imagePath.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: 'custom',
          message: 'Imagem muito grande',
          path: ['imagePath'],
        })
      }

      if (data.imagePath && !ALLOWED_FILE_TYPES.includes(data.imagePath.type)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Tipo de arquivo não permitido',
          path: ['imagePath'],
        })
      }
    }
  })
