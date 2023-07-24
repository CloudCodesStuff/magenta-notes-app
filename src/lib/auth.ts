import type { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import env from 'env'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'

export const google = GoogleProvider({
  clientId: env.GOOGLE_ID ?? '',
  clientSecret: env.GOOGLE_SECRET ?? '',
})

export const github = GithubProvider({
  clientId: env.GITHUB_ID ?? '',
  clientSecret: env.GITHUB_SECRET ?? '',
})

export const authOptions: AuthOptions = {
  // I don't like Next-Auth because their codebase is abysmal, which results in issues like type inconsistencies.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(db) as any,
  providers: [github, google],
  callbacks: {
    async session({ user, session }) {
      if (user) {
        session.user = user
      }
      return session
    },
  },
  debug: true,
}
