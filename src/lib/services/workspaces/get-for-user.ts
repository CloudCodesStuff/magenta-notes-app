import { db } from '@/lib/db'

/**
 * Find all workspaces for a specific user.
 * @param userId The user's ID.
 */
export async function getUserWorkspaces(userId: string) {
  const workspaceCollaborations = await db.workspaceCollaborators.findMany({
    where: {
      userId,
    },
    include: {
      workspace: {
        include: {
          user: true,
        },
      },
    },
  })

  const workspaces = workspaceCollaborations.map((collaboration) => {
    return collaboration.workspace
  })

  return workspaces
}
