import { CommentType } from '@/@types/Database'
import type { CommentDTO, YoutubeComment } from '../dtos'

export class CommentsPresenter {
  public static fromYoutube(
    youtubeComment: YoutubeComment,
    read: boolean,
  ): CommentDTO {
    const comment: CommentDTO = {
      read,
      from: 'YOUTUBE',
      commentId: youtubeComment.id,
      username: youtubeComment.authorDetails.displayName,
      isMember: youtubeComment.authorDetails.isChatSponsor,
      isPaid: youtubeComment.snippet.type === 'superChatEvent',
      avatarUrl: youtubeComment.authorDetails.profileImageUrl,
      comment:
        youtubeComment.snippet.type === 'superChatEvent'
          ? youtubeComment.snippet.superChatDetails.userComment
          : youtubeComment.snippet.type === 'textMessageEvent'
            ? youtubeComment.snippet.textMessageDetails.messageText
            : '',
      amount:
        youtubeComment.snippet.type === 'superChatEvent'
          ? youtubeComment.snippet.superChatDetails.amountDisplayString
          : undefined,
    }

    return comment
  }

  public static fromVdgApp(appComment: CommentType, read: boolean): CommentDTO {
    const comment: CommentDTO = {
      read,
      from: 'VDGAPP',
      commentId: appComment.id,
      isPaid: appComment.isPaid,
      comment: appComment.comment,
      username: appComment.user.username ?? 'Anônimo',
      avatarUrl: appComment.user.avatar ?? undefined,
    }

    return comment
  }
}
