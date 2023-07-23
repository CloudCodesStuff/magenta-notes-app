import { db } from '@/lib/db'
import { updateNoteData } from '@/lib/schemas/update-note'

export interface updateNoteUserData extends updateNoteData {
  id: string
}

export async function updateNote(data: updateNoteUserData) {
  const updatednote = await db.note.update({ where: { id: data.id }, data })
  return updatednote
}
