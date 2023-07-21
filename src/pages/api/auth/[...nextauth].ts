import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import env from 'env'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'

const github = GithubProvider({
  clientId: env.GITHUB_ID ?? '',
  clientSecret: env.GITHUB_SECRET ?? '',
})

export default NextAuth({
  // I don't like Next-Auth because their codebase is abysmal, which results in issues like type inconsistencies.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(db) as any,
  providers: [github],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const existingUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!existingUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        picture: existingUser.image,
      }
    },
  },
})
