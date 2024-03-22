import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ?? '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope:
            'openid https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.channel-memberships.creator',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token })
      }

      return token
    },
    async session({ session, token }) {
      if (session) {
        session = Object.assign({}, session, {
          accessToken: token.access_token,
        })
        console.log(session)
      }

      return session
    },
  },
})

export { handler as GET, handler as POST }
