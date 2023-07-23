import { db } from '@/lib/db'

export async function deleteWorkspace(id: string) {
  const deletedworkspace = await db.workspace.delete({ where: { id } })
  return deletedworkspace
}
