import { procedure, router } from '../trpc'
import { isAuthenticated } from '../middleware/is-authenticated'
import { z } from 'zod'
import { searchUser } from '@/lib/services/user/search-user'

const userRouter = router({
  searchUserByName: procedure
    .use(isAuthenticated)
    .input(z.string())
    .query(async (opts) => {
      const searchedUsers = await searchUser(opts.input)
      return searchedUsers
    }),
})

export default userRouter
