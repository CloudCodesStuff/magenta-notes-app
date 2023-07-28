import { getAllTags } from '@/lib/services/tags/get-all'
import { procedure, router } from '../trpc'

const tagsRouter = router({
  getAll: procedure.query(async () => {
    const tags = await getAllTags()
    return tags
  }),
})

export default tagsRouter
