import { db } from '@/lib/db'

import { AddTeamCollaboratorsInput } from '@/lib/schemas/add-team-collaborators'

export async function addTeamCollaborators({ teamId, users }: AddTeamCollaboratorsInput) {
  const userIds = Array.isArray(users) ? users : [users]

  const result = await db.$transaction(
    userIds.map((userId) =>
      db.teamCollaborators.upsert({
        where: {
          userId_teamId: {
            teamId,
            userId,
          },
        },
        create: {
          userId,
          teamId,
        },
        update: {
          userId,
          teamId,
        },
      }),
    ),
  )

  return result
}
