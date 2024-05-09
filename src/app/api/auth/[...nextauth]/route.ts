import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? ''

/*
  authorization: {
    params: {
      scope:
            },
  },
*/

const authOption: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'openid https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.channel-memberships.creator',
        },
      },
      // @ts-ignore
      // 'openid profile email https://www.googleapis.com/auth/youtube.channel-memberships.creator',
    }),
  ],
  callbacks: {
    jwt: async (data) => {
      console.log('jwt callback', data)
      return data
    },
  },
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST }
