import { db } from '@/lib/db'

/**
 * Get all the teams that a specific user is on.
 */
export async function getTeamsForUser(userId: string) {
  const teams = await db.team.findMany({
    where: {
      TeamCollaborators: {
        some: {
          userId,
        },
      },
    },
    include: {
      TeamCollaborators: {
        include: {
          user: true,
        },
      },
    },
  })

  type TeamWithCollaborators = (typeof teams)[number] & {
    users?: (typeof teams)[0]['TeamCollaborators'][number]['user'][]
  }

  const teamsWithUsers = teams.map((team: TeamWithCollaborators) => {
    team.users = team.TeamCollaborators.map((collaborator) => collaborator.user)
    return team
  })

  return teamsWithUsers
}
