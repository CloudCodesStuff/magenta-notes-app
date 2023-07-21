import { db } from '@/lib/db'

/**
 * Return all workspaces from the database.
 */
export async function getAllWorkspaces() {
  const allWorkspaces = await db.workspace.findMany()
  return allWorkspaces
}
