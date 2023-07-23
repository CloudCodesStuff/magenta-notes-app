import { z } from 'zod'

export const updateWorkspaceSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
})

export type updateWorkspaceData = z.infer<typeof updateWorkspaceSchema>
