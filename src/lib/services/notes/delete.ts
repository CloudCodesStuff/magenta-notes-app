import { db } from '@/lib/db'

export async function deleteNote(id: string) {
  const deletednote = await db.note.delete({ where: { id } })
  return deletednote
}
