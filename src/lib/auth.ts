import type { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import env from "env"

const github = GithubProvider({
  clientId: env.GITHUB_ID,
  clientSecret: env.GITHUB_SECRET,
})

export const nextAuthOptions: NextAuthOptions = {
  providers: [github]
}
