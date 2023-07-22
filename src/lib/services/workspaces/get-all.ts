import { db } from '@/lib/db'

/**
 * Return all workspaces from the database.
 */
export async function getAllWorkspaces(id: string) {
  const allWorkspaces = await db.notespace.findMany({
    where: {
      userId: id,
    },
    select: {
      id: true,
      name: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
  return allWorkspaces
}
