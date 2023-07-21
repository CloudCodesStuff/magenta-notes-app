import { type } from 'arktype'
import { z } from 'zod'
import { procedure, router } from '../trpc'

/**
 * Makeshift database.
 */
const db: Record<string, string> = {}

/**
 * Arktype and Zod schemas are equivalent.
 * They're both included for demonstration purposes.
 * Hovering over either will give a accurate type definition of what the parsed output type would look like.
 *
 * @example
 *
 * let x: unknown = ''
 *
 * const noteParsedWithArktype = addNoteInputArktype.assert(x)
 *
 * const noteParsedWithZod = addNoteInputZod.parse(x)
 *
 * Althought `x` is originally unknown, both parsed notes will have the type signature { id: string, text: string },
 * indicating the result of a successful parse.
 * The parse function will throw an error during runtime if not successful.
 */

/**
 * A schema for input with Arktype.
 * To assert that the input is of the type, invoke the `assert` method.
 */
const addNoteInputArktype = type({
  id: 'string',
  note: 'string',
})

/**
 * A schema for input with Zod.
 * To assert that the input is of the type, invoke the `parse` method.
 */
const addNoteInputZod = z.object({
  id: z.string(),
  note: z.string(),
})

export const appRouter = router({
  addNoteZod: procedure.input(addNoteInputZod).mutation(async (opts) => {
    db[opts.input.id] = opts.input.note
  }),

  addNoteArktype: procedure.input(addNoteInputArktype.assert).mutation(async (opts) => {
    db[opts.input.id] = opts.input.note
  }),

  /**
   * Given a note ID, find the corresponding note from the database.
   */
  getNoteArktype: procedure.input(type('string').assert).query(async (opts) => {
    return db[opts.input] ?? ''
  }),

  /**
   * Given a note ID, find the corresponding note from the database.
   */
  getNoteZod: procedure.input(z.string()).query(async (opts) => {
    return db[opts.input] ?? ''
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
