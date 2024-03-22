'use client'

// Icons
import { User } from 'lucide-react'

// Types
import { CommentDTO } from '../dtos'

// Components
import { Button } from '@/components/FormComponents'
import { CSSProperties } from 'react'
import { useComments } from '../hooks/use-comments'

type CommentItemProps = {
  comment: CommentDTO
  isHighlighted: boolean
  handleHighlightComment: (comment: CommentDTO | null) => void
  index?: number
  style?: CSSProperties
}

export function CommentItem({
  comment,
  isHighlighted,
  handleHighlightComment,
  style,
  index = 0,
}: CommentItemProps) {
  const { readCommentsStorageKey } = useComments()

  const isRead = () => {
    const readComments: string[] = JSON.parse(
      localStorage.getItem(readCommentsStorageKey) || '[]',
    )

    return readComments.includes(comment.commentId)
  }

  return (
    <div
      id={`each_item_${index}`}
      style={style}
      className="flex w-full items-center justify-start gap-4 border-b border-dashed border-gray-300 pr-3 pt-3"
    >
      <div className="flex items-center justify-start gap-4">
        {comment.avatarUrl ? (
          <div className="relative h-12 w-12 rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={comment.avatarUrl}
              alt="imagem do usuário"
              className="h-full w-full rounded-full object-cover"
            />

            {comment.isMember && (
              <span className="absolute -bottom-2 left-1/2 z-50 block -translate-x-1/2 -translate-y-1/2 rounded-sm bg-red-500 px-1 text-[10px] font-bold leading-relaxed text-white shadow-sm">
                Membro
              </span>
            )}
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User size={20} />
          </div>
        )}

        <div className="space-y-1">
          <div className="flex items-center justify-start gap-2">
            <span className="block text-sm font-bold">{comment.username}</span>

            {comment.isPaid && (
              <span className="block rounded-sm bg-emerald-200 px-1 text-xs font-bold leading-relaxed text-emerald-900">
                Pago
              </span>
            )}

            {/* {!comment.read && (
              <span className="block rounded-sm bg-orange-200 px-1 text-[10px] font-bold leading-relaxed text-orange-900">
                Aguardando leitura
              </span>
            )} */}

            {(comment.read || isRead()) && (
              <span className="block rounded-sm bg-yellow-200 px-1 text-xs font-bold leading-relaxed text-yellow-900">
                Exibido
              </span>
            )}
          </div>
          <p className="max-w-[700px] text-xs">{comment.comment}</p>
        </div>
      </div>

      <Button
        onClick={() => {
          console.log('click')
          handleHighlightComment(isHighlighted ? null : comment)
        }}
        className="m-0 ml-auto px-2 py-1 text-xs"
      >
        {isHighlighted ? 'Exibindo' : 'Exibir'}
      </Button>
    </div>
  )
}
