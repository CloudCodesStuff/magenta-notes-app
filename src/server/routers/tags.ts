import { z } from 'zod'
import { getAllTags } from '@/lib/services/tags/get-all'
import { procedure, router } from '../trpc'
import { deleteTag } from '@/lib/services/tags/delete'
import { createTag } from '@/lib/services/tags/create'
import { isAuthenticated } from '../middleware/is-authenticated'

const tagsRouter = router({
  getAll: procedure.query(async () => {
    const tags = await getAllTags()
    return tags
  }),

  create: procedure
    .use(isAuthenticated)
    .input(z.string())
    .mutation(async (opts) => {
      const result = await createTag(opts.input, opts.ctx.session.user.id)
      return result
    }),

  delete: procedure.input(z.string()).mutation(async (opts) => {
    const result = await deleteTag(opts.input)
    return result
  }),
})

export default tagsRouter
