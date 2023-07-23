import { updateNoteSchema } from '@/lib/schemas/update-note'
import { isAuthenticated } from '../middleware/is-authenticated'
import { procedure, router } from '../trpc'
import { createNote, createNoteInput } from '@/lib/services/notes/create'
import { deleteNote } from '@/lib/services/notes/delete'
import { getAllNotes } from '@/lib/services/notes/get-all'
import { getWorkspaceNotes } from '@/lib/services/notes/get-for-workspace'
import { updateNote } from '@/lib/services/notes/update'
import { z } from 'zod'

/**
 * @example User ID to get workspaces for.
 */
// const userId = 'clkdjnxlk0000l608hsj9jxb2'

const notesRouter = router({
  /**
   * Create a note
   */
  createNote: procedure
    .use(isAuthenticated)
    .input(createNoteInput)
    .mutation(async (opts) => {
      const note = await createNote(opts.input)
      return note
    }),

  deleteNote: procedure
    .use(isAuthenticated)
    .input(z.string())
    .mutation(async (opts) => {
      const deletedNote = await deleteNote(opts.input)
      return deletedNote
    }),

  updateNote: procedure
    .use(isAuthenticated)
    .input(updateNoteSchema)
    .mutation(async (opts) => {
      const updatedNote = await updateNote(opts.input)
      return updatedNote
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
  getNotesForWorkspace: procedure
    .use(isAuthenticated)
    .input(z.string())
    .query(async (opts) => {
      const notes = getWorkspaceNotes(opts.input)
      return notes
    }),
})

export default notesRouter
