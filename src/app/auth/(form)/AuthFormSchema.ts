import { z } from 'zod'

const AuthFormSchema = z.object({
  email: z
    .string()
    .email('Informe um e-mail válido')
    .nonempty('Informe um e-mail'),
  password: z.string().nonempty('Informe uma senha'),
})

export { AuthFormSchema }
export type AuthFormType = z.infer<typeof AuthFormSchema>
