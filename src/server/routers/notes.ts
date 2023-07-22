import { getUserWorkspaces } from '@/lib/services/workspaces/get-for-user'
import { getAllWorkspaces } from '@/lib/services/workspaces/get-all'
import { isAuthenticated } from '../middleware/is-authenticated'
import { procedure, router } from '../trpc'
import { createWorkspaceInput, createWorkspace } from '@/lib/services/workspaces/create'
import { createNote, createNoteInput } from '@/lib/services/notes/create'
import { getAllNotes } from '@/lib/services/notes/get-all'
import { getWorkspaceNotes } from '@/lib/services/notes/get-for-workspace'
import { z } from 'zod'

/**
 * @example User ID to get workspaces for.
 */
// const userId = 'clkdjnxlk0000l608hsj9jxb2'

const notesRouter = router({
  /**
   * Create a note
   */
  createNote: procedure.input(createNoteInput).mutation(async (opts) => {
    const note = await createNote(opts.input)
    return note
  }),

  /**
   * Get all notes in the database.
   */
  getAllNotes: procedure.query(async () => {
    const allNotes = await getAllNotes()
    return allNotes
  }),

  /**
   * Get all notes in given workspace, Pass workspace id as input/parameter
   */
  getNotesForCurrentWorkspace: procedure
    .use(isAuthenticated)
    .input(z.string())
    .query(async (opts) => {
      const notes = getWorkspaceNotes(opts.input)
      return notes
    }),
})

export default notesRouter
