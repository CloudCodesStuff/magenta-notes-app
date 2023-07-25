import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Home, History, Star, Clipboard, Check } from 'lucide-react'
// import { trpc } from '@/lib/trpc'
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

export default function Dashboard() {
  const { data: session } = useSession()

  // const workspacesQuery = trpc.workspaces.getWorkspacesForCurrentUser.useQuery()

  // const notesQuery = trpc.notes.getRecentNotesForUser.useQuery()

  if (!session) {
    return <div>You must be signed in</div>
  }

  return (
    <div className="w-full mx-auto max-w-7xl flex gap-2 p-10">
      <Card className="grow-0 w-16 lg:w-60 h-fit overflow-hidden bg-surface-300-600-token">
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
              <li key={tab.href} className="rounded hover:bg-red-400">
                <a href={tab.href} className="inline-block p-4 whitespace-nowrap">
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
              <p>Card Content</p>
            </CardContent>

            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-wrap gap-2 justify-between items-center">
                <span>Workspaces</span>
                <Button size="xs" asChild>
                  <Link href="/workspaces">See all</Link>
                </Button>
              </CardTitle>
              <div className="border" />
            </CardHeader>

            <CardContent>
              <p>Card Content</p>
            </CardContent>

            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teams</CardTitle>
              <div className="border" />
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
