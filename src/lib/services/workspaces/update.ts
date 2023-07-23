import { db } from '@/lib/db'
import { z } from 'zod'

export const updateWorkspaceInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
})

export async function updateWorkspace(data: z.infer<typeof updateWorkspaceInput>) {
  const updatedworkspace = await db.workspace.update({ where: { id: data.id }, data })
  return updatedworkspace
}
