import { db } from '@/lib/db'

/**
 * Find all Starred workspaces for a specific user.
 * @param userId The user's ID.
 */
export async function getStarredWorkspaceforUser(userId: string) {
  const starredWorkspaces = await db.starredWorkspace.findMany({
    where: {
      userId,
    },
    select: {
      workspace: true,
    },
  })

  return starredWorkspaces
}
