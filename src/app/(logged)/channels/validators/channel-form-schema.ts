import { z } from 'zod'

const URL_PATTERN =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\S*)$/

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

export const createChannelFormSchema = z
  .object({
    name: z
      .string()
      .nonempty('O nome é obrigatório')
      .min(3, 'O nome deve ter no mínimo 3 caracteres')
      .max(30, 'O nome deve ter no máximo 30 caracteres'),
    link: z
      .string()
      .nonempty('O link é obrigatório')
      .refine((value) => URL_PATTERN.test(value), 'O link é inválido'),
    type: z.enum(['playlist', 'partners']).default('playlist'),
    active: z.boolean().optional().default(true),
    imagePath: z.any(),
  })
  .superRefine((value, context) => {
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
