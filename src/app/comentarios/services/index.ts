import { Services } from '@/infra/services'

import type { CommentType } from '@/@types/Database'
import { CommentDTO, GetCommentsResponse } from '../dtos'
import { FirebaseAuth } from '@/lib/firebase/auth'

class AppCommentServices extends Services<CommentType> {
  async startLive(liveChatId: string): Promise<void> {
    const accessToken = await FirebaseAuth.auth.currentUser?.getIdToken()
    try {
      await this.api('/live/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          liveChatId,
        }),
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async stopLive(): Promise<void> {
    try {
      await this.api('/live/stop', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // TODO: Should get comments based on the liveId
  async getComments() {
    const accessToken = await FirebaseAuth.auth.currentUser?.getIdToken()
    try {
      const response = await this.api('/query/liveChat', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const { data } = await response.json()
      const liveCommentsDetails = data[0] as GetCommentsResponse

      return liveCommentsDetails.items
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async setAsHighlighted(comment: CommentDTO): Promise<void> {
    const accessToken = await FirebaseAuth.auth.currentUser?.getIdToken()
    try {
      await this.api('/query/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          collection: 'highlight',
          data: {
            ...comment,
            id: 'highlighted',
          },
          id: 'highlighted',
        }),
      })
    } catch (error: any) {
      console.error(error)
    }
  }

  async removeHighlighted(): Promise<void> {
    const accessToken = await FirebaseAuth.auth.currentUser?.getIdToken()
    try {
      await this.api('/query/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          collection: 'highlight',
          id: 'highlighted',
        }),
      })
    } catch (error: any) {
      console.error(error)
    }
  }

  async getHighlighted(): Promise<CommentDTO | null> {
    const accessToken = await FirebaseAuth.auth.currentUser?.getIdToken()
    try {
      const response = await this.api('/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          fieldToSearch: 'id',
          collection: 'highlight',
          valueToSearch: 'highlighted',
        }),
      })

      const { data } = await response.json()

      if (!data) {
        return null
      }

      return data[0]
    } catch (error: any) {
      throw new Error(error.message + 'Erro ao buscar comentário destacado')
    }
  }
}

export const commentServices = new AppCommentServices('comments')
