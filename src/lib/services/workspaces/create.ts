import { db } from '@/lib/db'
import type { CreateWorkspaceData } from '@/lib/schemas/create-workspace'

export async function createWorkspace(data: CreateWorkspaceData) {
  const workspace = await db.workspace.create({ data })
  return workspace
}
