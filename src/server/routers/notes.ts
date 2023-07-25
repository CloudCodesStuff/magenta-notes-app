import { z } from 'zod'
import { updateNoteSchema } from '@/lib/schemas/update-note'
import { createNote, createNoteInput } from '@/lib/services/notes/create'
import { deleteNote } from '@/lib/services/notes/delete'
import { getAllNotes } from '@/lib/services/notes/get-all'
import { getWorkspaceNotes } from '@/lib/services/notes/get-for-workspace'
import { updateNote } from '@/lib/services/notes/update'
import { getStarredNotesforUser } from '@/lib/services/starred-note/get-for-user'
import { isAuthenticated } from '../middleware/is-authenticated'
import { procedure, router } from '../trpc'
import { getRecentNotesForUser } from '@/lib/services/notes/get-recent-for-user'

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

  getStarredNotesForUser: procedure.use(isAuthenticated).query(async (opts) => {
    const starredNotes = getStarredNotesforUser(opts.ctx.session.user.id)
    return starredNotes
  }),

  getRecentNotesForUser: procedure.use(isAuthenticated).query(async (opts) => {
    const recentNotes = getRecentNotesForUser(opts.ctx.session.user.id)
    return recentNotes
  }),
})

export default notesRouter
