import { trpc } from '@/lib/trpc'
import type { NextPageWithLayout } from '@/types/next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StickyNote } from '@/components/sticky-note'
import Layout from '../layout'

const Page: NextPageWithLayout = () => {
  const notesQuery = trpc.notes.getRecentNotesForUser.useQuery()

  return (
    <Card className="col-span-2 h-fit">
      <CardHeader>
        <CardTitle className="text-5xl font-bold">Recent Notes</CardTitle>
        <CardDescription>Pick up where you left off</CardDescription>
        <div className="border" />
      </CardHeader>

      <CardContent>
        {notesQuery.data?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notesQuery.data?.map((note) => (
              <div key={note.id} className="col-span-1">
                <StickyNote {...note} />
              </div>
            ))}
          </div>
        ) : (
          <h3 className="text-center">No Notes Yet!</h3>
        )}
      </CardContent>
    </Card>
  )
}

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Page
