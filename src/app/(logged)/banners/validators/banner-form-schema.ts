import { z } from 'zod'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

const URL_PATTERN = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

export const createBannerFormSchema = z
  .object({
    title: z
      .string({ required_error: 'Informe o título' })
      .min(3, 'Informe no mínimo 3 caracteres'),
    active: z.coerce.boolean().default(true),
    link: z.string().nullable().default(null).optional(),
    imagePath: z.any(),
  })
  .superRefine((value, context) => {
    if (value.link && value.link !== '' && !URL_PATTERN.test(value.link)) {
      context.addIssue({
        code: 'custom',
        message: 'Insira uma URL válida',
        path: ['link'],
      })
    }

    if (!value.imagePath || value.imagePath === '') {
      context.addIssue({
        code: 'custom',
        message: 'Insira um imagem',
        path: ['imagePath'],
      })
    }

    if (value.imagePath && typeof value.imagePath !== 'string') {
      if (value.imagePath.size > MAX_FILE_SIZE) {
        context.addIssue({
          code: 'custom',
          message: 'O tamanho da imagem deve ser menor que 2MB',
          path: ['imagePath'],
        })
      }

      if (!ALLOWED_FILE_TYPES.includes(value.imagePath.type)) {
        context.addIssue({
          code: 'custom',
          message: 'A imagem deve ser PNG, JPEG ou JPG',
          path: ['imagePath'],
        })
      }
    }
  })
