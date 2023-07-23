import { z } from 'zod'

export const updateNoteSchema = z.object({
  id: z.string(),
  color: z.string().optional(),
  content: z.string().optional(),
})

export type updateNoteData = z.infer<typeof updateNoteSchema>
