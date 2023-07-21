import transformer from 'superjson'
import { initTRPC } from '@trpc/server'
import type { Context } from './context'

const trpc = initTRPC.context<Context>().create({ transformer })

export const { procedure, router, middleware, mergeRouters } = trpc
