import { db } from '@/lib/db'
import { updateWorkspaceData } from '@/lib/schemas/update-workspace'

export interface updateWorkspaceForUserData extends updateWorkspaceData {
  id: string
}

export async function updateWorkspace(data: updateWorkspaceForUserData) {
  const updatedworkspace = await db.workspace.update({ where: { id: data.id }, data })
  return updatedworkspace
}
