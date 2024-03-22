'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { commentServices } from '../services'
import { useComments } from '../hooks/use-comments'
import { CommentDTO, YoutubeLiveChatResponse } from '../dtos'
import { useEffect, useRef, useState } from 'react'
import { CommentsPresenter } from '../presenters'
import { AppFirestore } from '@/lib/firebase/database'
import { query, where, collection, onSnapshot } from 'firebase/firestore'
import { CommentItem } from '../components/comment-item'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/UI/tabs'
import { Button } from '@/components/UI/Button'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList as List } from 'react-window'
import { CommentType } from '@/@types/Database'
import { FirebaseAuth } from '@/lib/firebase/auth'

type CommentParams = {
  params: {
    liveId: string
  }
}

export default function Comments({ params }: CommentParams) {
  const listRef = useRef<any>(null)
  const commentsStorageKey = `@VDG-DASH:YOUTUBE-COMMENTS-ALL-${params.liveId}`

  const { readComment, readCommentsStorageKey } = useComments()

  const readComments: string[] = JSON.parse(
    localStorage.getItem(readCommentsStorageKey) || '[]',
  )

  const router = useRouter()

  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const liveChatId = searchParams.get('live-chat-id')

  async function updateUserAccessToken() {
    const accessToken = await FirebaseAuth.auth.currentUser?.getIdToken()

    if (accessToken) {
      Cookies.set('VDG_USER_ACCESS_TOKEN', accessToken)
    }
  }

  const [comments, setComments] = useState<CommentDTO[]>(
    localStorage.getItem(commentsStorageKey)
      ? JSON.parse(localStorage.getItem(commentsStorageKey) || '[]')
      : [],
  )

  const { onlyPaidComments, onlyVdgAppComments, onlyYoutubeComments } =
    useComments()

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

  async function handleStopCron() {
    await commentServices.stopLive()
    router.push('/comentarios')
  }

  const { data: highlightComment } = useQuery({
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

  const scrollToBottom = () => {
    listRef.current?.scrollTo(999999999999999)
  }

  function updateComments(data: CommentDTO[]) {
    setComments((prev) => {
      const prevIds = prev.map((e) => e.commentId)

      const updated = [
        ...prev,
        ...data.filter((e) => !prevIds.includes(e.commentId)),
      ]

      localStorage.setItem(commentsStorageKey, JSON.stringify(updated))
      return updated
    })
  }

  /* Get comments from Youtube */
  useEffect(() => {
    const q = query(
      collection(AppFirestore, 'liveChat'),
      where('id', '==', liveChatId),
    )

    updateUserAccessToken()

    onSnapshot(q, (querySnapshot) => {
      const comments: CommentDTO[] = []
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') return
        const data = change.doc.data() as YoutubeLiveChatResponse

        if (data.items) {
          const items = data.items.map((e) =>
            CommentsPresenter.fromYoutube(e, false),
          )
          comments.push(...items)
        }
      })

      updateComments(comments)
      scrollToBottom()
    })
  }, [])

  /* Get comments from VDG-APP */
  useEffect(() => {
    const q = query(
      collection(AppFirestore, 'youtube'),
      where('liveId', '==', params.liveId),
    )

    updateUserAccessToken()

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.docChanges().forEach((change, i) => {
        if (change.type === 'removed') return
        const data = change.doc.data() as CommentType
        const comment = CommentsPresenter.fromVdgApp(
          data,
          readComments.includes(data.id),
        )

        // @ts-ignore
        setComments((prev) => [
          ...prev,
          prev.some((e) => e.commentId === comment.commentId) ? [] : comment,
        ])
      })
    })

    updateComments(comments)
    scrollToBottom()
  }, [])

  return (
    <Tabs
      defaultValue="youtube-app"
      className="mx-auto h-full w-full max-w-[1200px]"
    >
      <div className="flex w-full items-center justify-between">
        <TabsList className="mb-2">
          <TabsTrigger onClick={scrollToBottom} value="youtube">
            Youtube
          </TabsTrigger>

          <TabsTrigger onClick={scrollToBottom} value="app">
            VDG App
          </TabsTrigger>

          <TabsTrigger onClick={scrollToBottom} value="youtube-app">
            Comentários pagos (YT + APP)
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4">
          <Button onClick={handleStopCron}>Encerrar live</Button>
        </div>
      </div>

      <div className="h-[90%] w-full rounded-md border border-zinc-400 p-4">
        <TabsContent
          className="m-0 h-full w-full space-y-2 divide-y divide-zinc-400 p-0"
          value="youtube"
        >
          <div className="relative h-full w-full">
            <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={listRef}
                  direction="vertical"
                  itemKey={(index) => {
                    return `each_comment_${index}`
                  }}
                  className="List"
                  height={height}
                  itemCount={comments.filter(onlyYoutubeComments).length}
                  itemSize={100}
                  width={width}
                >
                  {({ index, style }) => {
                    const res = comments.filter(onlyYoutubeComments)
                    if (res.length === 0) return null
                    const e = res[index]
                    return (
                      <CommentItem
                        key={e.commentId}
                        comment={e}
                        index={index}
                        handleHighlightComment={toggleHighlightCommentFn}
                        isHighlighted={
                          highlightComment
                            ? highlightComment.commentId === e.commentId
                            : false
                        }
                        style={style}
                      />
                    )
                  }}
                </List>
              )}
            </AutoSizer>
          </div>

          {comments.filter(onlyYoutubeComments).length === 0 && (
            <p className="block py-4 text-sm">Ainda sem comentários</p>
          )}
        </TabsContent>

        <TabsContent
          className="m-0 h-full w-full space-y-2 divide-y divide-zinc-400 p-0"
          value="app"
        >
          <div className="relative h-full w-full">
            <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={listRef}
                  direction="vertical"
                  itemKey={(index) => {
                    return `each_comment_${index}`
                  }}
                  className="List"
                  height={height}
                  itemCount={comments.filter(onlyVdgAppComments).length}
                  itemSize={100}
                  width={width}
                >
                  {({ index, style }) => {
                    const res = comments.filter(onlyVdgAppComments)
                    if (res.length === 0) return null
                    const e = res[index]
                    return (
                      <CommentItem
                        key={e.commentId}
                        comment={e}
                        index={index}
                        handleHighlightComment={toggleHighlightCommentFn}
                        isHighlighted={
                          highlightComment
                            ? highlightComment.commentId === e.commentId
                            : false
                        }
                        style={style}
                      />
                    )
                  }}
                </List>
              )}
            </AutoSizer>
          </div>

          {comments.filter(onlyVdgAppComments).length === 0 && (
            <p className="block py-4 text-sm">Ainda sem comentários</p>
          )}
        </TabsContent>

        <TabsContent
          className="m-0 h-full w-full space-y-2 divide-y divide-zinc-400 p-0"
          value="youtube-app"
        >
          <div className="relative h-full w-full">
            <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={listRef}
                  direction="vertical"
                  itemKey={(index) => {
                    return `each_comment_${index}`
                  }}
                  className="List"
                  height={height}
                  itemCount={comments.filter(onlyPaidComments).length}
                  itemSize={100}
                  width={width}
                >
                  {({ index, style }) => {
                    const res = comments.filter(onlyPaidComments)
                    if (res.length === 0) return null
                    const e = res[index]
                    return (
                      <CommentItem
                        key={e.commentId}
                        comment={e}
                        index={index}
                        handleHighlightComment={toggleHighlightCommentFn}
                        isHighlighted={
                          highlightComment
                            ? highlightComment.commentId === e.commentId
                            : false
                        }
                        style={style}
                      />
                    )
                  }}
                </List>
              )}
            </AutoSizer>
          </div>

          {comments.filter(onlyPaidComments).length === 0 && (
            <p className="block py-4 text-sm">Ainda sem comentários</p>
          )}
        </TabsContent>
      </div>
    </Tabs>
  )
}
