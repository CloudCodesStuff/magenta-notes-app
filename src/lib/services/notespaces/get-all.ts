import { db } from '@/lib/db'

/**
 * Return all workspaces from the database.
 */
export async function getAllNotespaces() {
  const allNotespaces = await db.notespace.findMany()
  return allNotespaces
}
