import { z } from 'zod'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

export const createFirstAcccessFormSchema = z
  .object({
    avatar: z.any(),
    name: z.string().nonempty('O nome é obrigatório'),
    email: z.string().email(),
    password: z.string().nonempty('A senha é obrigatória'),
    confirmPassword: z
      .string()
      .nonempty('A confirmação de senha é obrigatória'),
  })
  .superRefine((data, context) => {
    if (data.password !== data.confirmPassword) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas não conferem',
        path: ['password'],
      })
    }

    if (data.avatar && data.avatar.size > MAX_FILE_SIZE) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'O arquivo é muito grande',
        path: ['avatar'],
      })
    }

    if (data.avatar && !ALLOWED_FILE_TYPES.includes(data.avatar.type)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Formato de arquivo não suportado',
        path: ['avatar'],
      })
    }
  })

export type CreateFirstAcccessFormSchemaType = z.infer<
  typeof createFirstAcccessFormSchema
>
