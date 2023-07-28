import type { NextPageWithLayout } from '@/types/next'
import Layout from '../layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CreateTeamForm from '@/components/forms/create-team'
import { TeamCard } from '@/components/team-card'

const Page: NextPageWithLayout = () => {
  const query = trpc.teams.getCurrentUserTeams.useQuery()

  console.log(query.data)

  return (
    <Card className="col-span-2 h-fit">
      <CardHeader>
        <div className="flex w-full justify-between">
          <div>
            <CardTitle className="text-5xl font-bold">Teams</CardTitle>
            <CardDescription>Collaborate with others</CardDescription>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4"></Plus>
                New Team
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Team</DialogTitle>
                <DialogDescription>
                  Touch grass and find friends: impossible challenge
                </DialogDescription>
              </DialogHeader>
              <CreateTeamForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="border" />
      </CardHeader>

      <CardContent>
        {query.data?.length ? (
          <div className="flex flex-wrap gap-2 p-2">
            {query.data.map((team) => (
              <TeamCard key={team.id} {...team} />
            ))}
          </div>
        ) : (
          <div>No teams found</div>
        )}
      </CardContent>
    </Card>
  )
}

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Page
