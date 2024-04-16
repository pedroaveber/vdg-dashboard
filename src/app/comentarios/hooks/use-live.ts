'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { commentServices } from '../services'
import { CommentDTO, YoutubeLiveChatResponse } from '../dtos'
import { useEffect, useState } from 'react'
import { useComments } from './use-comments'
import { CommentsPresenter } from '../presenters'
import { AppFirestore } from '@/lib/firebase/database'

import {
  query,
  where,
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from 'firebase/firestore'

import { useSearchParams } from 'next/navigation'

const readCommentsStorageKey = '@VDG-DASH:YOUTUBE-COMMENTS'

export const useLive = () => {
  const readComments: string[] = JSON.parse(
    localStorage.getItem(readCommentsStorageKey) || '[]',
  )

  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  const liveChatId = searchParams.get('live-chat-id')

  const { readComment } = useComments()

  const [comments, setComments] = useState<CommentDTO[]>([])

  const commentsInStateIds = comments.map((comment) => comment.commentId)

  function updateYoutubeComments(
    querySnapshot: QuerySnapshot<DocumentData, DocumentData>,
  ) {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === 'removed') return
      const data = change.doc.data() as YoutubeLiveChatResponse
      const items = data.items

      const recents = items
        .filter((item) => !commentsInStateIds.includes(item.id))
        .map((e) => CommentsPresenter.fromYoutube(e, false))

      setComments((prev) => [...prev, ...recents])
    })
  }

  function onHighlight(data: CommentDTO | null) {
    if (data) {
      if (!readComments.includes(data.commentId)) {
        localStorage.setItem(
          readCommentsStorageKey,
          JSON.stringify([...readComments, data.commentId]),
        )
      }

      setComments((prev) => readComment(prev, data.commentId))
    }

    queryClient.invalidateQueries({
      queryKey: ['comment-highlight'],
    })
  }

  const { data: highlightComment, isLoading: isLoadingHighlightComment } =
    useQuery({
      queryKey: ['comment-highlight'],
      queryFn: () => commentServices.getHighlighted(),
    })

  const { mutateAsync: toggleHighlightCommentFn } = useMutation({
    mutationFn: async (data: CommentDTO | null) => {
      if (data) {
        await commentServices.setAsHighlighted(data)
      } else {
        await commentServices.removeHighlighted()
      }
      return data
    },
    onError: (error) => {
      console.log(error)
      throw new Error('Erro ao destacar comentário')
    },
    onSuccess: onHighlight,
  })

  /* Get comments from Youtube */
  useEffect(() => {
    const q = query(
      collection(AppFirestore, 'liveChat'),
      where('id', '==', liveChatId),
    )

    onSnapshot(q, (querySnapshot) => {
      updateYoutubeComments(querySnapshot)
    })
  }, [])

  return {
    comments,
    setComments,
    highlightComment,
    toggleHighlightCommentFn,
    isLoadingHighlightComment,
  }
}
