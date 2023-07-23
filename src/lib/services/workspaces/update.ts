import { db } from '@/lib/db'
import { z } from 'zod'

export const updateWorkspaceInput = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
})

export async function updateWorkspace(id: string, data: z.infer<typeof updateWorkspaceInput>) {
  const updatedworkspace = await db.workspace.update({ where: { id }, data })
  return updatedworkspace
}
