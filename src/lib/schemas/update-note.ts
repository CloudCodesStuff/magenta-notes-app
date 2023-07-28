import { z } from 'zod'

export const updateNoteSchema = z.object({
  id: z.string().default(''),
  title: z
    .string()
    .optional()
    .transform((value) => value || undefined),
  color: z
    .string()
    .optional()
    .transform((value) => value || undefined),
})

export type UpdateNoteInput = z.infer<typeof updateNoteSchema>
