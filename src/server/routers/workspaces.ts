import { getUserWorkspaces } from '@/lib/services/workspaces/get-for-user'
import { getAllWorkspaces } from '@/lib/services/workspaces/get-all'
import { isAuthenticated } from '../middleware/is-authenticated'
import { procedure, router } from '../trpc'

/**
 * @example User ID to get workspaces for.
 */
// const userId = 'clkdjnxlk0000l608hsj9jxb2'

const workspacesRouter = router({
  /**
   * Get all workspaces in the database.
   */
  getAllWorkspaces: procedure.query(async () => {
    const allWorkspaces = await getAllWorkspaces()
    return allWorkspaces
  }),

  /**
   * Get the currently authenticated user's workspaces.
   */
  getWorkspacesForCurrentUser: procedure.use(isAuthenticated).query(async (opts) => {
    const workspaces = getUserWorkspaces(opts.ctx.session.user.id)
    return workspaces
  }),
})

export default workspacesRouter
