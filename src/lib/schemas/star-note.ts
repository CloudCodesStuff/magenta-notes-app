import { z } from 'zod'

export const starNoteSchema = z.object({
  userId: z.string(),
  noteId: z.string(),
  starred: z.boolean(),
})

export type StarNoteInput = z.infer<typeof starNoteSchema>
