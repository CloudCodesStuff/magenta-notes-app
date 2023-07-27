import type { NextPageWithLayout } from '@/types/next'
import Layout from '../layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Page: NextPageWithLayout = () => {
  return (
    <Card className="col-span-2 h-fit">
      <CardHeader>
        <CardTitle className="text-5xl font-bold">Tasks</CardTitle>
        <CardDescription>Work assigned to you</CardDescription>
        <div className="border" />
      </CardHeader>

      <CardContent>TODO</CardContent>
    </Card>
  )
}

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Page
