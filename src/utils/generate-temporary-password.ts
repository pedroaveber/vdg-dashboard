import { v4 as uuid } from 'uuid'

export async function generateTemporaryPassword(): Promise<string> {
  const uniqueValue = await uuid()
  const uniquePassword = uniqueValue.replaceAll('-', '')

  return uniquePassword
}
