import { procedure, router } from '../trpc'
import { createNote, createNoteInput } from '@/lib/services/notes/create'
import { getAllWorkspaces } from '@/lib/services/workspaces/get-all'

/**
 * The concepts being presented here are request handlers vs. services.
 *
 * The request handler will receive `opts`, which are request paramaters.
 *
 * It will then focus on generating a response, usually by invoking other services.
 *
 * "services" are independent modules that are responsible for handling business logic,
 * like connecting to the database, 3rd party APIs, etc.
 *
 * The request handler will then return the relevant data to the client.
 *
 * In these examples, the services and business logic are not too complex.
 *
 * But the motivation for spliting them up is to allow request handling logic and business logic to
 * scale indepdendently.
 *
 * i.e. the request handler may have to handle authentication, authorization, rate limiting, redirects, etc.
 *      while the service may have to handle additional file system operations, database operations, 3rd party APIs, etc.
 */
const examplePrismaRouter = router({
  /**
   * Given note information, add it to the database.
   * @returns The newly created note.
   */
  createNote: procedure.input(createNoteInput).mutation(async (opts) => {
    const note = await createNote(opts.input)
    return note
  }),

  /**
   * Get all workspaces in the database.
   */
  getWorkspaces: procedure.query(async () => {
    const allWorkspaces = await getAllWorkspaces('clkdjnxlk0000l608hsj9jxb2')
    return allWorkspaces
  }),
})

export default examplePrismaRouter
