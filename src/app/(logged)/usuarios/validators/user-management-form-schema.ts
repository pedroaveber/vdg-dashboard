import { z } from 'zod'

export const createUserManagementFormSchema = z.object({
  email: z
    .string()
    .email('Informe um e-mail válido')
    .nonempty('O e-mail é obrigatório'),

  policy: z.array(z.string()),
})
