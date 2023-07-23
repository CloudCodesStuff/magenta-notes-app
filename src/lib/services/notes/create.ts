import { z } from 'zod'
import { db } from '@/lib/db'

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
export const createNoteInput = z.object({
  workspaceId: z.string(),
  /**
   * Content can be any JSON object or string.
   */
  content: z.object({}).passthrough().or(z.string()),

  color: z.string().nullish(),
})

/**
 * Create a new note in the database.
 * @returns The newly created note.
 */
export async function createNote(data: z.infer<typeof createNoteInput>) {
  const note = await db.note.create({ data })
  return note
}
