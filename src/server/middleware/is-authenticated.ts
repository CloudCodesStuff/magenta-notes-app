import { TRPCError } from '@trpc/server'
import { middleware } from '../trpc'

export const isAuthenticated = middleware(async (opts) => {
  const session = await opts.ctx.getSession()

  if (session?.user.id == null) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next({
    ctx: {
      /**
       * For convenience, the session is attached to the context after this middleware.
       */
      session,
    },
  })
})
