import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Home, History, Star, Clipboard, Check } from 'lucide-react'
import { trpc } from '@/lib/trpc'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const metadata = {
  title: 'Dashboard',
}

const tabs = [
  { label: 'Overview', href: '/dashboard', icon: Home },
  { label: 'Recent', href: '/dashboard/recent', icon: History },
  { label: 'Starred', href: '/dashboard/starred', icon: Star },
  { label: 'Drafts', href: '/dashboard/drafts', icon: Clipboard },
  { label: 'Tasks', href: '/dashboard/tasks', icon: Check },
]

function findMatchingTab(pathname: string) {
  return tabs.find((tab) => pathname.startsWith(tab.href))
}

export default function Dashboard() {
  const { data: session } = useSession()

  const router = useRouter()

  const workspacesQuery = trpc.workspaces.getWorkspacesForCurrentUser.useQuery()
  const notesQuery = trpc.notes.getRecentNotesForUser.useQuery()
  const teamsQuery = trpc.teams.getCurrentUserTeams.useQuery()

  const currentTab = useMemo(() => {
    return findMatchingTab(router.asPath)
  }, [router.asPath])

  if (!session) {
    return <div>You must be signed in</div>
  }

  return (
    <div className="w-full mx-auto max-w-7xl flex gap-2 p-10">
      <Card className="grow-0 w-16 lg:w-60 h-fit overflow-hidden">
        <CardHeader className="p-0">
          <CardTitle>
            <div className="w-full h-16 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600" />
            <Avatar className="mx-auto -mt-6 h-12 w-12">
              <AvatarImage src={session.user.image ?? ''} alt="profile picture" />
              <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </CardTitle>

          <CardDescription className="text-center text-xl font-bold whitespace-normal truncate">
            {session.user.name}
          </CardDescription>
        </CardHeader>

        <CardContent className="mt-4 px-2">
          <ul>
            {tabs.map((tab) => (
              <li
                key={tab.href}
                className={`my-2 rounded hover:bg-slate-300 dark:hover:bg-slate-600 ${
                  currentTab?.href === tab.href && 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <a href={tab.href} className="inline-block w-full p-4 whitespace-nowrap">
                  <tab.icon className="inline-block w-5 h-5" />
                  <span className="hidden md:inline ml-5">{tab.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grow grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notes</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
              <div className="border" />
            </CardHeader>

            <CardContent>
              {!notesQuery.data?.length && <h3 className="text-center">No Notes Yet!</h3>}
              <div className="flex flex-col gap-4">
                {notesQuery.data?.map((note) => (
                  <div key={note.id} className="border rounded p-2">
                    <div
                      className="p-4 mb-1 w-full"
                      style={{ backgroundColor: note.color || 'gray' }}
                    />
                    <h3 className="text-xl font-semibold">{note.title}</h3>
                    <p className="text-sm">Last Updated{note.updatedAt.toLocaleString()}</p>
                    <Button size="sm" variant="outline" className="w-full my-2" asChild>
                      <Link
                        href={`/workspaces/${note.workspaceId}/notes/${note.id}`}
                        className="cursor-pointer"
                      >
                        Edit
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Workspaces</CardTitle>
              <div className="border" />
            </CardHeader>

            <CardContent>
              {!workspacesQuery.data?.length && <h3 className="text-center">No Workspaces Yet!</h3>}
              <div className="flex flex-col gap-4">
                {workspacesQuery.data?.map((workspace) => (
                  <div key={workspace.id} className="border p-2 rounded">
                    <h2 className="text-xl font-semibold">{workspace.name}</h2>
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
              <CardTitle>Teams</CardTitle>
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
    </div>
  )
}
