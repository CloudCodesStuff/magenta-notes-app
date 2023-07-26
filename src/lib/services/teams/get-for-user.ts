import { db } from '@/lib/db'

/**
 * Get all the teams that a specific user is on.
 */
export async function getTeamsForUser(userId: string) {
  const teamConnections = await db.teamCollaborators.findMany({
    where: {
      userId,
    },
    include: {
      team: true,
    },
  })

  const teams = teamConnections.map((teamConnection) => teamConnection.team)

  return teams
}
