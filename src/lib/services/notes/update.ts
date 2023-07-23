import { db } from '@/lib/db'
import { z } from 'zod'

export const updateNoteInput = z.object({
  id: z.string(),
  color: z.string().optional(),
  content: z.string().optional(),
})

export async function updateNote(data: z.infer<typeof updateNoteInput>) {
  const updatednote = await db.note.update({ where: { id: data.id }, data })
  return updatednote
}
