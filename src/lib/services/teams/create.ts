import { db } from '@/lib/db'
import { CreateTeamInput } from '@/lib/schemas/create-team'

export async function createTeam(data: CreateTeamInput, userId: string) {
  const team = await db.team.create({ data })

  const collaborator = await db.teamCollaborators.create({
    data: {
      userId,
      teamId: team.id,
    },
  })

  return { team, collaborator }
}
