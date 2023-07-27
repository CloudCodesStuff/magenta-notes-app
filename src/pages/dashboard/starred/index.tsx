import type { NextPageWithLayout } from '@/types/next'
import Layout from '../layout'
import { trpc } from '@/lib/trpc'
import { StickyNote } from '@/components/sticky-note'

const Page: NextPageWithLayout = () => {
  const query = trpc.notes.getStarredNotesForUser.useQuery()

  return (
    <div className="flex flex-col gap-8 p-10">
      <div>
        <h1 className="text-6xl text-center">Starred Items: TODO</h1>
      </div>

      <div>
        {query.data?.length ? (
          <div className="flex flex-col gap-4">
            {query.data?.map((note) => <StickyNote key={note.id} {...note} />)}
          </div>
        ) : (
          <h3 className="text-center">No Notes Yet!</h3>
        )}
      </div>
    </div>
  )
}

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Page
