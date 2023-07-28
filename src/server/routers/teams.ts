import { z } from 'zod'
import { procedure, router } from '../trpc'
import { isAuthenticated } from '../middleware/is-authenticated'
import { getTeamsForUser } from '@/lib/services/teams/get-for-user'
import { createTeamSchema } from '@/lib/schemas/create-team'
import { createTeam } from '@/lib/services/teams/create'
import { deleteTeam } from '@/lib/services/teams/delete-team'

const teamsRouter = router({
  getCurrentUserTeams: procedure.use(isAuthenticated).query(async (opts) => {
    const teams = await getTeamsForUser(opts.ctx.session.user.id)
    return teams
  }),

  createTeam: procedure
    .use(isAuthenticated)
    .input(createTeamSchema)
    .mutation(async (opts) => {
      const result = await createTeam(opts.input, opts.ctx.session.user.id)
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
