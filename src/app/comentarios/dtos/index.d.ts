export type YoutubeSnippet = {
  autherChannelId: string
  displayMessage: string
  hasDisplayContent: boolean
  publishedAt: string
  liveChatId: string
} & (
  | {
      type: 'textMessageEvent'
      textMessageDetails: {
        messageText: string
      }
    }
  | {
      type: 'superChatEvent'
      superChatDetails: {
        amountDisplayString: string
        amoutnMicros: string
        currency: string
        userComment: string
        tier: number
      }
    }
  | {
      type: 'memberMilestoneChatEvent' | 'newSponsorEvent'
    }
)

export type YoutubeComment = {
  authorDetails: {
    channelId: string
    channelUrl: string
    displayName: string
    isChatOwner: boolean
    isChatModerator: boolean
    isChatSponsor: boolean
    isVerified: boolean
    profileImageUrl: string
  }
  etag: string
  id: string
  kind: string
  snippet: YoutubeSnippet
}

export type CommentDTO = {
  read: boolean
  comment: string
  isPaid: boolean
  amount?: string
  username: string
  commentId: string
  isMember?: boolean
  avatarUrl?: string
  from: 'YOUTUBE' | 'VDGAPP'
}

export type GetCommentsResponse = {
  id: string
  nextPageToken: string
  pollingIntervalMillis: number
  items: YoutubeComment[]
}

export type YoutubeLiveChatResponse = {
  id: string
  items: YoutubeComment[]
  nextPageToken: string
  pollingIntervalMillis: number
}
