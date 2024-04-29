import { z } from 'zod'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg']

export const createFirstAcccessFormSchema = z
  .object({
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
  })

export type CreateFirstAcccessFormSchemaType = z.infer<
  typeof createFirstAcccessFormSchema
>
