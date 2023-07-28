import { db } from '@/lib/db'

export async function getTeamById(id: string) {
  const team = await db.team.findFirst({
    where: { id },
    include: {
      TeamCollaborators: {
        include: {
          user: true,
        },
      },
    },
  })

  if (!team) {
    return team
  }

  type TeamWithusers = typeof team & {
    users?: (typeof team)['TeamCollaborators'][number]['user'][]
  }

  const teamWithUsers: TeamWithusers = team

  teamWithUsers.users = teamWithUsers?.TeamCollaborators?.map((collaborator) => collaborator.user)

  return teamWithUsers
}
