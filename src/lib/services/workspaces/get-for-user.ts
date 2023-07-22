import { db } from '@/lib/db'

/**
 * Find all workspaces for a specific user.
 * @param userId The user's ID.
 */
export async function getUserWorkspaces(userId: string) {
  const allWorkspaces = await db.notespace.findMany({
    where: {
      userId,
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
