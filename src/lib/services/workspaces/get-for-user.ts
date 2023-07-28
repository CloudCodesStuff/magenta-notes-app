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

  const ownedWorkspaces = await db.workspace.findMany({
    where: { userId },
  })

  const collaborationWorkspaces = workspaceCollaborations.map((collaboration) => {
    return collaboration.workspace
  })

  const notOwnedCollaborationWorkspaces = collaborationWorkspaces.filter((workspace) => {
    return workspace.userId !== userId
  })

  const allWorkspaces = [...ownedWorkspaces, ...notOwnedCollaborationWorkspaces]

  return allWorkspaces
}
