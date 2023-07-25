import { router } from '../trpc'
import exampleRouter from './example'
import examplePrismaRouter from './example-prisma'
import notesRouter from './notes'
import userRouter from './user'
import workspacesRouter from './workspaces'

export const appRouter = router({
  example: exampleRouter,
  examplePrisma: examplePrismaRouter,
  workspaces: workspacesRouter,
  notes: notesRouter,
  users: userRouter
})

// export the type definition of the API for client usage.
export type AppRouter = typeof appRouter
