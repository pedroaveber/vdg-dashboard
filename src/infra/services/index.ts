import { api } from '@/lib/api'
import { FirebaseAuth } from '@/lib/firebase/auth'
import { getFromLocalStorage, setLocalStorageItem } from '@/utils/local-storage'

export class Services<T extends { id: string }> {
  private readonly authTokenKey = 'VDG-USER-ACCESS-TOKEN'
  protected api = api

  constructor(public collection: string) {}

  protected async getAccessToken() {
    const accessToken = getFromLocalStorage<string>(this.authTokenKey)

    if (accessToken) {
      return accessToken
    }

    const firebaseAuthToken =
      await FirebaseAuth.auth.currentUser?.getIdToken(true)

    if (firebaseAuthToken) {
      setLocalStorageItem(
        this.authTokenKey,
        firebaseAuthToken,
        1000 * 30, // 30 seconds
      )
    }

    return firebaseAuthToken
  }

  public async create(data: T): Promise<void> {
    const accessToken = await this.getAccessToken()

    await this.api('/query/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        collection: this.collection,
        data,
        id: data.id,
      }),
    })
  }

  public async index(): Promise<T[]> {
    const accessToken = await this.getAccessToken()

    const response = await this.api(`/query/${this.collection}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const { data } = await response.json()
    return data
  }

  public async get(id: string): Promise<T> {
    const accessToken = await this.getAccessToken()
    const response = await this.api('/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        collection: this.collection,
        fieldToSearch: 'id',
        valueToSearch: id,
      }),
    })

    const { data } = await response.json()
    return data[0]
  }

  public async update(data: T): Promise<void> {
    const accessToken = await this.getAccessToken()
    await this.api('/query/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        collection: this.collection,
        data,
      }),
    })
  }

  public async destroy(id: string) {
    const accessToken = await this.getAccessToken()
    await this.api('/query/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        collection: this.collection,
        id,
      }),
    })
  }
}
