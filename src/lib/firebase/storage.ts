import { api } from '../api'
import { FirebaseAuth } from './auth'
import Cookies from 'js-cookie'

interface UploadFileProps {
  file: File
}

interface ConstructorProps {
  bucket: string
}

interface GetPathStorageFromUrlProps {
  url: string
}

interface DeleteImageFromStorageProps {
  url: string
}

export class FirebaseStorage {
  private bucket: string

  protected async getAccessToken() {
    const accessToken = Cookies.get('VDG_USER_ACCESS_TOKEN')

    const firebaseAuthToken =
      await FirebaseAuth.auth.currentUser?.getIdToken(true)

    if (firebaseAuthToken) {
      Cookies.set('VDG_USER_ACCESS_TOKEN', firebaseAuthToken)
    }

    return firebaseAuthToken ?? accessToken
  }

  constructor({ bucket }: ConstructorProps) {
    this.bucket = bucket
  }

  /**
   * Upload a file to firebase storage
   * @param collection - The collection name
   * @param file - The file to be uploaded
   * @returns The image path and the uploaded image name
   * @throws Error if the upload fails
   */
  public async uploadFile({ file }: UploadFileProps) {
    const accessToken = await this.getAccessToken()

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('bucket', this.bucket)

      const response = await api(`/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const { data } = await response.json()
      return data.url
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  public async deleteImageFromStorage({
    url,
  }: DeleteImageFromStorageProps): Promise<void> {
    const accessToken = await this.getAccessToken()
    try {
      const fileName = this.getPathStorageFromUrl({ url })

      await api('/upload/delete', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName,
          bucket: this.bucket,
        }),
      })
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao excluir arquivo')
    }
  }

  /**
   * This function should get the path from firebase storage from a url
   * @param url - The url from firebase storage
   * @returns The path from firebase storage
   */
  private getPathStorageFromUrl({ url }: GetPathStorageFromUrlProps): string {
    const firestoreBaseUrl =
      'https://firebasestorage.googleapis.com/v0/b/' +
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET +
      'o/'

    const currentDownloadUrl = url.replace(firestoreBaseUrl, '')
    const indexOfEndPath = currentDownloadUrl.indexOf('?')

    const currentDownloadUrlWithoutCreadentials = currentDownloadUrl.substring(
      0,
      indexOfEndPath,
    )

    const imageName = currentDownloadUrlWithoutCreadentials.split('%2F')[1]
    return imageName
  }
}
