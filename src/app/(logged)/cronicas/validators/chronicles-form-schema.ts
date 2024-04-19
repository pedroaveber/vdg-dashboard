import { date, z } from 'zod'

export const createChroniclesFormSchema = z.object({
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
})
