import { db } from '@/lib/db'
import type { CreateNoteData } from '@/lib/schemas/create-note'

/**
 * Create a new note in the database.
 * @returns The newly created note.
 */
export async function createNote(data: CreateNoteData, userId: string) {
  const note = await db.note.create({ data: { ...data, userId } })
  return note
}
