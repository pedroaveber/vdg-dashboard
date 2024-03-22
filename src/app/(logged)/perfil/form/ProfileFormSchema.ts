import { z } from 'zod'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
]

export const ProfileFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Nome deve ter no mínimo 3 caracteres')
      .max(100, 'O nome deve ter no máximo 100 caractéres')
      .nonempty('Nome é obrigatório'),
    email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
    avatar: z.any(),
  })
  .superRefine((data, ctx) => {
    if (data.avatar && data.avatar !== '') {
      if (data.avatar && typeof data.avatar !== 'string') {
        if (data.avatar && data.avatar.size > MAX_FILE_SIZE) {
          ctx.addIssue({
            code: 'custom',
            message: 'Imagem muito grande',
            path: ['imagem'],
          })
        }

        if (data.avatar && !ALLOWED_FILE_TYPES.includes(data.avatar.type)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Tipo de arquivo não permitido',
            path: ['imagem'],
          })
        }
      }
    }
  })

export type ProfileFormSchemaType = z.infer<typeof ProfileFormSchema>
