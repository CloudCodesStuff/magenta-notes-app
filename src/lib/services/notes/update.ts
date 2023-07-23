import { db } from '@/lib/db'
import { z } from 'zod'

export const updateNoteInput = z.object({
  color: z.string(),
  content: z.string(),
})

export async function updateNote(id: string, data: z.infer<typeof updateNoteInput>) {
  const updatednote = await db.note.update({ where: { id }, data })
  return updatednote
}
