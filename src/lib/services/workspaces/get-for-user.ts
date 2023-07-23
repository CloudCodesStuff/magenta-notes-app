import { db } from '@/lib/db'

/**
 * Find all workspaces for a specific user.
 * @param userId The user's ID.
 */
export async function getUserWorkspaces(userId: string) {
  const ClientWorkspaces = await db.workspace.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return ClientWorkspaces
}
