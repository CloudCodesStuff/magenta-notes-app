import { getServerSession, type Session } from 'next-auth'
import type { inferAsyncReturnType } from '@trpc/server'
import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { authOptions } from '@/lib/auth'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: CreateNextContextOptions) {
  let session: Session | null

  /**
   * Utility that gets and caches the session for a request.
   */
  const getSession = async () =>
    (session ??= await getServerSession(opts.req, opts.res, authOptions))

  return {
    req: opts.req,
    res: opts.res,
    getSession,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
