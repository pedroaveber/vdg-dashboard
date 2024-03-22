import { UserType } from '@/@types/Database'
import { Services } from '@/infra/services'

export class AuthService extends Services<UserType> {
  async getUserByEmail({
    email,
    accessToken,
  }: {
    email: string
    accessToken: string
  }): Promise<UserType | null> {
    console.log('accessToken', accessToken)

    try {
      const response = await this.api('/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          collection: this.collection,
          fieldToSearch: 'email',
          valueToSearch: email,
        }),
      })

      const { data } = await response.json()
      if (!data) {
        return null
      }

      return data[0]
    } catch (error) {
      console.error(error)
      throw new Error('Erro ao buscar informações')
    }
  }
}

export const authService = new AuthService('users')
