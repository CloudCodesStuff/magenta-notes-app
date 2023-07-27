import type { NextPageWithLayout } from '@/types/next'
import Layout from '../layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Page: NextPageWithLayout = () => {
  return (
    <Card className="col-span-2 h-fit">
      <CardHeader>
        <CardTitle className="text-5xl font-bold">Teams</CardTitle>
        <CardDescription>Collaborate with others</CardDescription>
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
