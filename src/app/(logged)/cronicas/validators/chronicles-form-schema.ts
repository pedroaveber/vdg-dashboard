import { date, z } from 'zod'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
]

export const createChroniclesFormSchema = z
  .object({
    active: z.boolean().default(false),
    title: z
      .string()
      .min(3, 'Mínimo 3 caractéres')
      .max(100, 'Máximo 100 caractéres'),

    content: z
      .string()
      .min(3, 'Mínimo 3 caractéres')
      .max(10_000, 'Máximo 10.000 caractéres'),

    author: z
      .string()
      .min(3, 'Mínimo 3 caractéres')
      .max(100, 'Máximo 100 caractéres'),

    authorship: z
      .string()
      .min(3, 'Mínimo 3 caractéres')
      .max(100, 'Máximo 100 caractéres'),

    date: z.date(),
    imagePath: z.any(),
  })
  .superRefine((data, ctx) => {
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
