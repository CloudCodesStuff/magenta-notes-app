import { db } from '@/lib/db'
import { UpdateNoteInput } from '@/lib/schemas/update-note'

export interface updateNoteUserData extends UpdateNoteInput {
  id: string
}

export async function updateNote(data: updateNoteUserData) {
  const updatednote = await db.note.update({ where: { id: data.id }, data })
  return updatednote
}
