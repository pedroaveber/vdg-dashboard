import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
const googleClientSecret = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_SECRET

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/google',
  },
  session: {
    strategy: 'jwt',
  },
  secret: 'my-secret',
  providers: [
    GoogleProvider({
      clientId: googleClientId!,
      clientSecret: googleClientSecret!,
    }),
  ],
}
