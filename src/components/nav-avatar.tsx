import { useMemo } from 'react'
import { useSession, signOut } from 'next-auth/react'
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
import Link from 'next/link'

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()

export default function NavAvatar() {
  const { data: session } = useSession()

  const initials = useMemo(() => getInitials(session?.user.name ?? ''), [session])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user.image ?? ''} alt={session?.user.name ?? ''} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session?.user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{session?.user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link href="/">Home</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link href="/workspaces">Workspaces</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className='cursor-pointer' asChild>
          <Link href="/editor ">Editor</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem className='text-red-600 focus:text-red-600 cursor-pointer' onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
