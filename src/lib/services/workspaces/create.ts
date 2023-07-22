import { db } from '@/lib/db'
import { z } from 'zod'

/**
 * Input for creating new workspace
 */

export const createWorkspaceInput = z.object({})

export async function createWorkspace(data: z.infer<typeof createWorkspaceInput>) {
  const workspace = await db.workspace.create({ data })
  return workspace
}
