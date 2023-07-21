import { router } from '../trpc'
import exampleRouter from './example'
import examplePrismaRouter from './example-prisma'

export const appRouter = router({
  example: exampleRouter,
  examplePrisma: examplePrismaRouter,
})

// export the type definition of the API for client usage.
export type AppRouter = typeof appRouter
