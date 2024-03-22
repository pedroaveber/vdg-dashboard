import { z } from 'zod'
import { createUserManagementFormSchema } from '../validators/user-management-form-schema'

export type UserManagementFormSchema = z.infer<
  typeof createUserManagementFormSchema
>
