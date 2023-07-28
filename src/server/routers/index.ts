import { router } from '../trpc'
import exampleRouter from './example'
import examplePrismaRouter from './example-prisma'
import notesRouter from './notes'
import userRouter from './user'
import tagsRouter from './tags'
import teamsRouter from './teams'
import workspacesRouter from './workspaces'

export const appRouter = router({
  example: exampleRouter,
  examplePrisma: examplePrismaRouter,
  notes: notesRouter,
  users: userRouter,
  tags: tagsRouter,
  teams: teamsRouter,
  workspaces: workspacesRouter,
})

// export the type definition of the API for client usage.
export type AppRouter = typeof appRouter
