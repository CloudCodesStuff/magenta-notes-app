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
  content: z.any().optional(),
  tags: z.object({ id: z.string().nullish(), name: z.string() }).array().optional(),
})

export type UpdateNoteInput = z.infer<typeof updateNoteSchema>
