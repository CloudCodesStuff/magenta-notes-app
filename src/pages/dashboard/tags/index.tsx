import type { NextPageWithLayout } from '@/types/next'
import Layout from '../layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc'
import fontColorContrast from 'font-color-contrast'
import { Badge } from '@/components/ui/badge'

const Page: NextPageWithLayout = () => {
  const query = trpc.tags.getAll.useQuery()

  return (
    <Card className="col-span-2 h-fit">
      <CardHeader>
        <CardTitle className="text-5xl font-bold">Tags</CardTitle>
        <CardDescription>Tags assigned to your notes</CardDescription>
        <div className="border" />
      </CardHeader>

      <CardContent>
        {query.data?.length ? (
          <div className="flex flex-row gap-4">
            {query.data.map((tag) => {
              const color = tag.color || 'gray'
              const contrastColor = fontColorContrast(color)

              return (
                <Badge
                  key={tag.id}
                  color={color}
                  style={{ color: contrastColor }}
                  className="text-lg"
                >
                  {tag.name}
                </Badge>
              )
            })}
          </div>
        ) : (
          <div>No tags found</div>
        )}
      </CardContent>
    </Card>
  )
}

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Page
