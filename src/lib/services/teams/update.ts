import { db } from '@/lib/db'

interface UpdateTeamInput {
  teamId: string
  userIds: string[]
}

export async function updateTeam(input: UpdateTeamInput) {
  const team = await db.team.findFirst({
    where: {
      id: input.teamId,
    },
    include: {
      TeamCollaborators: {
        include: {
          user: true,
        },
      },
    },
  })

  if (!team) {
    return
  }

  const existingTeamUserIds = team.TeamCollaborators.map((collaborator) => collaborator.userId)

  const userIdsToAdd = input.userIds.filter((userId) => !existingTeamUserIds.includes(userId))
  const userIdsToRemove = existingTeamUserIds.filter((userId) => !input.userIds.includes(userId))

  await db.$transaction(
    userIdsToAdd.map((userId) =>
      db.teamCollaborators.create({
        data: {
          teamId: input.teamId,
          userId,
        },
      }),
    ),
  )

  await db.$transaction(
    userIdsToRemove.map((userId) =>
      db.teamCollaborators.delete({
        where: {
          userId_teamId: {
            teamId: input.teamId,
            userId,
          },
        },
      }),
    ),
  )
}
