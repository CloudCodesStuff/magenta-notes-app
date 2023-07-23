import { z } from 'zod'

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(50, {
      message: 'Name must be less than 50 characters.',
    }),
  description: z
    .string()
    .min(2, {
      message: 'Description must be at least 2 characters.',
    })
    .max(50, {
      message: 'Description must be less than 50 characters.',
    })
    .optional(),
})

export type CreateWorkspaceData = z.infer<typeof createWorkspaceSchema>
