import type { NextPageWithLayout } from '@/types/next'
import Layout from '../layout'

const Page: NextPageWithLayout = () => {
  return (
    <div className="p-10">
      <h1 className="text-6xl text-center">Drafts: TODO</h1>
    </div>
  )
}

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Page
