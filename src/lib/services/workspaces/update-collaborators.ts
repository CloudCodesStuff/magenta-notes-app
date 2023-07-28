import { db } from '@/lib/db'

export interface UpdateCollaboratorsInput {
  workspaceId: string
  userIds: string[]
}

export async function updateCollaborators(input: UpdateCollaboratorsInput) {
  const workspace = await db.workspace.findFirst({
    where: {
      id: input.workspaceId,
    },
    include: {
      collaborators: {
        include: {
          user: true,
        },
      },
    },
  })

  if (!workspace) {
    return
  }

  const existingCollaboratorIds = workspace.collaborators.map((collaborator) => collaborator.userId)

  const userIdsToAdd = input.userIds.filter((userId) => !existingCollaboratorIds.includes(userId))
  const userIdsToRemove = existingCollaboratorIds.filter(
    (userId) => !input.userIds.includes(userId),
  )

  await db.$transaction(
    userIdsToAdd.map((userId) =>
      db.workspaceCollaborators.create({
        data: {
          workspaceId: input.workspaceId,
          userId,
        },
      }),
    ),
  )

  await db.$transaction(
    userIdsToRemove.map((userId) =>
      db.workspaceCollaborators.delete({
        where: {
          workspaceId_userId: {
            workspaceId: input.workspaceId,
            userId,
          },
        },
      }),
    ),
  )
}
