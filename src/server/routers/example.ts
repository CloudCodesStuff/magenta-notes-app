import { z } from 'zod'
import { procedure, router } from '../trpc'

/**
 * Makeshift database.
 * @see example-prisma.ts for a real database.
 */
const db: Record<string, string> = {}

/**
 * A schema for input with Zod.
 * To assert that the input is of the type, invoke the `parse` method.
 *
 * It can take an input of unknown type, and then return a type-safe object.
 *
 * @example
 *
 * ```ts
 *
 * let x: unknown = ''
 *
 * const validatedNoteInput = addNoteInputZod.parse(x)
 *
 * validatedNoteInput.id // string
 * validatedNoteInput.note // string
 * ```
 *
 * If the input is invalid, it will throw an error during runtime.
 *
 * {@link procedure.input} will invoke the `parse` method automatically, giving you a type-safe input.
 */
const addNoteInput = z.object({
  color: z.string().optional(),
  content: z.string(),
  workspaceId: z.number(),
})

const exampleRouter = router({
  /**
   * Given note information, add it to the database.
   */
  addNote: procedure.input(addNoteInput).mutation(async (opts) => {
    db[opts.input.workspaceId] = opts.input.content
  }),

  /**
   * Given a note ID, find the corresponding note from the database.
   */
  getNote: procedure.input(z.number()).query(async (opts) => {
    return db[opts.input] ?? ''
  }),
})

export default exampleRouter
