import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { trpc } from '@/lib/trpc'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { NextPageWithLayout } from '@/types/next'
import Layout from './layout'
import { StickyNote } from '@/components/sticky-note'

export const metadata = {
  title: 'Dashboard',
}

const Page: NextPageWithLayout = () => {
  const { data: session } = useSession()

  const workspacesQuery = trpc.workspaces.getWorkspacesForCurrentUser.useQuery()
  const notesQuery = trpc.notes.getRecentNotesForUser.useQuery()
  const teamsQuery = trpc.teams.getCurrentUserTeams.useQuery()

  if (!session) {
    return <div>You must be signed in</div>
  }

  return (
    <div className="grow grid grid-cols-1 lg:grid-cols-3 gap-2">
      <Card className="col-span-2 h-fit">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">Recent Notes</CardTitle>
          <CardDescription>Pick up where you left off</CardDescription>
          <div className="border" />
        </CardHeader>

        <CardContent>
          {notesQuery.data?.length ? (
            <div className="flex flex-col gap-4">
              {notesQuery.data?.map((note) => <StickyNote key={note.id} {...note} />)}
            </div>
          ) : (
            <h3 className="text-center">No Notes Yet!</h3>
          )}
        </CardContent>
      </Card>

      <div className="col-span-1 flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Workspaces</CardTitle>
            <CardDescription>Organize your notes</CardDescription>
            <div className="border" />
          </CardHeader>

          <CardContent>
            {!workspacesQuery.data?.length && <h3 className="text-center">No Workspaces Yet!</h3>}
            <div className="flex flex-col gap-4">
              {workspacesQuery.data?.map((workspace) => (
                <div key={workspace.id} className="border p-2 rounded">
                  <h2 className="text-xl font-semibold truncate">{workspace.name}</h2>
                  <p className="">{workspace.description}</p>
                  <p className="text-sm">{workspace.updatedAt.toLocaleString()}</p>
                  <Button size="sm" asChild className="w-full" variant="secondary">
                    <Link href={`/workspaces/${workspace.id}`}>View</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter>
            {workspacesQuery.data?.length ? (
              <Button asChild className="w-full">
                <Link href="/workspaces">View All</Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link href="/workspaces">Create a Workspace</Link>
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-semibold">Teams</CardTitle>
            <CardDescription>Collaborate with others</CardDescription>
            <div className="border" />
          </CardHeader>

          <CardContent>
            {!teamsQuery.data?.length && <h3 className="text-center">No Teams Yet!</h3>}
            <div className="flex flex-col gap-4">
              {teamsQuery.data?.map((team) => (
                <div key={team.id} className="border p-2 rounded">
                  <div>ID: {team.id}</div>
                  <div>Name: {team.name}</div>
                  <div>Description: {team.description}</div>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter>
            {teamsQuery.data?.length ? (
              <Button variant="secondary" asChild className="w-full">
                <Link href="/dashboard/teams">View All</Link>
              </Button>
            ) : (
              <Button variant="secondary" asChild className="w-full">
                <Link href="/dashboard/teams">Create a Team</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Page
