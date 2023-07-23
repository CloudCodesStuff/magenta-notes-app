import { db } from '@/lib/db'
import type { CreateWorkspaceData } from '@/lib/schemas/create-workspace'

export interface CreateWorkspaceForUserData extends CreateWorkspaceData {
  userId: string
}

export async function createWorkspace(data: CreateWorkspaceForUserData) {
  const workspace = await db.workspace.create({ data })
  return workspace
}
