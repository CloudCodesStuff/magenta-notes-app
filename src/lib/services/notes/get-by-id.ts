import { db } from '@/lib/db'

export async function getNoteById(id: string) {
  const note = await db.note.findUnique({ where: { id } })
  return note
}
