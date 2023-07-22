import { db } from '@/lib/db'

/**
 * Find all workspaces.
 */
export async function getAllWorkspaces() {
  const allWorkspaces = await db.workspace.findMany({
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
