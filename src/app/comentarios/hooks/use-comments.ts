import { CommentDTO } from '../dtos'

export const useComments = () => {
  const readCommentsStorageKey = '@VDG-DASH:YOUTUBE-COMMENTS'

  function onlyYoutubeComments(comment: CommentDTO) {
    return comment.from === 'YOUTUBE'
  }

  function onlyVdgAppComments(comment: CommentDTO) {
    return comment.from === 'VDGAPP'
  }

  function onlyPaidComments(comment: CommentDTO) {
    return comment.isPaid
  }

  function readComment(comments: CommentDTO[], id: string) {
    return comments.map((comment) => {
      if (comment.commentId === id) {
        comment.read = true
      }

      return comment
    })
  }

  return {
    readComment,
    onlyYoutubeComments,
    onlyVdgAppComments,
    onlyPaidComments,
    readCommentsStorageKey,
  }
}
