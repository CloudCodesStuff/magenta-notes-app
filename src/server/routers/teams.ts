import { z } from 'zod'
import { procedure, router } from '../trpc'
import { isAuthenticated } from '../middleware/is-authenticated'
import { getTeamsForUser } from '@/lib/services/teams/get-for-user'
import { createTeamSchema } from '@/lib/schemas/create-team'
import { createTeam } from '@/lib/services/teams/create'
import { deleteTeam } from '@/lib/services/teams/delete-team'
import { getTeamById } from '@/lib/services/teams/get-by-id'
import { updateTeam } from '@/lib/services/teams/update'

const teamsRouter = router({
  getCurrentUserTeams: procedure.use(isAuthenticated).query(async (opts) => {
    const teams = await getTeamsForUser(opts.ctx.session.user.id)
    return teams
  }),

  getTeamById: procedure
    .use(isAuthenticated)
    .input(z.string())
    .query(async (opts) => {
      const team = await getTeamById(opts.input)
      return team
    }),

  createTeam: procedure
    .use(isAuthenticated)
    .input(createTeamSchema)
    .mutation(async (opts) => {
      const result = await createTeam(opts.input, opts.ctx.session.user.id)
      return result
    }),

  updateTeam: procedure
    .use(isAuthenticated)
    .input(
      z.object({
        teamId: z.string(),
        userIds: z.string().array(),
      }),
    )
    .mutation(async (opts) => {
      const result = await updateTeam(opts.input)
      return result
    }),

  deleteTeam: procedure
    .use(isAuthenticated)
    .input(z.string())
    .mutation(async (opts) => {
      const result = await deleteTeam(opts.input)
      return result
    }),
})

export default teamsRouter
