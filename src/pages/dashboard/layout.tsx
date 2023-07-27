import { useSession } from 'next-auth/react'
import { Home, History, Star, Clipboard, Check } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

const tabs = [
  { label: 'Overview', href: '/dashboard', icon: Home },
  { label: 'Recent', href: '/dashboard/recent', icon: History },
  { label: 'Starred', href: '/dashboard/starred', icon: Star },
  { label: 'Drafts', href: '/dashboard/drafts', icon: Clipboard },
  { label: 'Tasks', href: '/dashboard/tasks', icon: Check },
]

function findMatchingTab(pathname: string) {
  const matchingTabs = tabs.filter((tab) => pathname.startsWith(tab.href))

  // get the longest matching tab
  return matchingTabs.reduce((prev, current) => {
    return prev.href.length > current.href.length ? prev : current
  })
}

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { data: session } = useSession()

  const router = useRouter()

  const currentTab = useMemo(() => {
    return findMatchingTab(router.asPath)
  }, [router.asPath])

  if (!session) {
    return <div>You must be signed in</div>
  }

  return (
    <div className="w-full mx-auto max-w-7xl flex gap-2 p-10">
      <Card className="grow-0 h-fit overflow-hidden min-w-max">
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

        <CardContent>
          <ul>
            {tabs.map((tab) => {
              const isActive = currentTab?.href === tab.href

              const activeClass = isActive ? 'bg-slate-300 dark:bg-slate-600' : ''

              return (
                <li
                  key={tab.href}
                  className={`flex my-1 rounded hover:bg-slate-300 dark:hover:bg-slate-600 ${activeClass}`}
                >
                  <a href={tab.href} className="flex items-center px-4 py-2">
                    <tab.icon className="w-5 h-5" />
                    <span className="hidden md:inline ml-5">{tab.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </CardContent>
      </Card>

      <div className="w-full">{children}</div>
    </div>
  )
}
