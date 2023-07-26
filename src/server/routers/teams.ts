import { procedure, router } from '../trpc'
import { isAuthenticated } from '../middleware/is-authenticated'
import { getTeamsForUser } from '@/lib/services/teams/get-for-user'

const teamsRouter = router({
  getCurrentUserTeams: procedure.use(isAuthenticated).query(async (opts) => {
    const teams = await getTeamsForUser(opts.ctx.session.user.id)
    return teams
  }),
})

export default teamsRouter
