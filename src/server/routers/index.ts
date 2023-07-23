import { router } from '../trpc'
import exampleRouter from './example'
import examplePrismaRouter from './example-prisma'
import notesRouter from './notes'
import workspacesRouter from './workspaces'

export const appRouter = router({
  example: exampleRouter,
  examplePrisma: examplePrismaRouter,
  workspaces: workspacesRouter,
  notes: notesRouter,
})

// export the type definition of the API for client usage.
export type AppRouter = typeof appRouter
