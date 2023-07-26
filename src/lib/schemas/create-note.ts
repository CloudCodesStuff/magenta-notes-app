import { z } from 'zod'

export const createNoteSchema = z.object({
  workspaceId: z.string(),

  title: z.string().min(2, { message: 'Title must be at least 2 characters long' }),

  /**
   * Content can be any JSON object or string.
   */
  content: z.object({}).passthrough().or(z.string()).default(''),

  color: z.string().default('gray'),
})

export type CreateNoteData = z.infer<typeof createNoteSchema>
