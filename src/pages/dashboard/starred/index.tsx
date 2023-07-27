import type { NextPageWithLayout } from '@/types/next'
import Layout from '../layout'
import { trpc } from '@/lib/trpc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StickyNote } from '@/components/sticky-note'

const Page: NextPageWithLayout = () => {
  const query = trpc.notes.getStarredNotesForUser.useQuery()

  return (
    <Card className="col-span-2 h-fit">
      <CardHeader>
        <CardTitle className="text-5xl font-bold">Starred</CardTitle>
        <CardDescription>Special notes you took</CardDescription>
        <div className="border" />
      </CardHeader>

      <CardContent>
        {query.data?.length ? (
          <div className="flex flex-col gap-4">
            {query.data?.map((note) => <StickyNote key={note.id} {...note} />)}
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
