import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
]

const URL_PATTERN = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

export const createFeedFormSchema = z
  .object({
    active: z.coerce.boolean().default(true),
    publishOnWhatsapp: z.coerce.boolean().default(true),
    privacy: z
      .enum(['PUBLIC', 'MEMBERS_ONLY', 'VIP_MEMBERS_ONLY', 'REGISTEREDS'])
      .default('PUBLIC'),
    link: z.string().optional(),
    description: z
      .string({
        required_error: 'Texto da Notícia é obrigatório',
      })
      .min(3, 'Mínimo de 3 caracteres'),

    imagePath: z.any(),
    secondaryImagePath: z.any(),
  })
  .superRefine((data, ctx) => {
    if (data.link && data.link !== '' && !URL_PATTERN.test(data.link)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Insira uma URL válida',
        path: ['link'],
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

    if (
      data.secondaryImagePath &&
      typeof data.secondaryImagePath !== 'string'
    ) {
      if (
        data.secondaryImagePath &&
        data.secondaryImagePath.size > MAX_FILE_SIZE
      ) {
        ctx.addIssue({
          code: 'custom',
          message: 'Imagem muito grande',
          path: ['secondaryImagePath'],
        })
      }

      if (
        data.secondaryImagePath &&
        !ALLOWED_FILE_TYPES.includes(data.secondaryImagePath.type)
      ) {
        ctx.addIssue({
          code: 'custom',
          message: 'Tipo de arquivo não permitido',
          path: ['secondaryImagePath'],
        })
      }
    }
  })
