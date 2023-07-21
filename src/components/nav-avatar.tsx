import { useMemo } from 'react'
import { LogOut } from 'lucide-react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()

export default function NavAvatar() {
  const { data: session } = useSession()

  const initials = useMemo(() => getInitials(session?.user.name ?? ''), [session])

  if (!session) {
    return <Button onClick={() => signIn()}>Sign in</Button>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session.user.image ?? ''} alt={session.user.name ?? ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="w-5 h-5" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
