import { z } from 'zod'

const AuthFormSchema = z.object({
  email: z
    .string()
    .email('Informe um e-mail válido')
    .nonempty('Informe um e-mail')
    .transform((value) => value.toLowerCase().trim()),
  password: z
    .string()
    .nonempty('Informe uma senha')
    .transform((value) => value.trim()),
})

export { AuthFormSchema }
export type AuthFormType = z.infer<typeof AuthFormSchema>
