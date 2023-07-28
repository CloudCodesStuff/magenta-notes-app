import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn } from 'next-auth/react'
import NavAvatar from './nav-avatar'
import { Button } from './ui/button'
import {
  NavigationMenuLink,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import { ThemeToggle } from './theme-toggle'
import { useMemo } from 'react'
import { Pacifico } from 'next/font/google'

const dancingScript = Pacifico({ subsets: ['latin'], weight: '400' })

const loggedOutLinks = [{ label: 'Home', href: '/' }]

const loggedInLinks = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Workspaces', href: '/workspaces' },
]

export default function Nav() {
  const { data: session } = useSession()

  const links = useMemo(() => {
    return session?.user.id != null ? loggedInLinks : loggedOutLinks
  }, [session])

  return (
    <nav className="px-7">
      <div className="flex w-full items-center mx-auto justify-between border-b border-primary-900-50-token py-1">
        <div className="flex gap-6 md:gap-10">
          <Link
            href="/"
            className="flex gap-2 items-end hover:bg-surface-100-800-token rounded p-1 transition-all"
          >
            <Image src="/scribblev4.png" alt="Scribble logo" height="42" width="42" />
            <span
              className={`hidden text-xl sm:inline-block tracking-widest text-primary-900-50-token ${dancingScript.className}`}
            >
              Scribble
            </span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="hidden sm:flex">
              {links.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink href={link.href} className={navigationMenuTriggerStyle()}>
                    {link.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <ThemeToggle />
          </div>
          <div className="flex items-center gap-3">
            {session?.user.id ? (
              <NavAvatar />
            ) : (
              <>
                <Button onClick={() => signIn()} variant="secondary">
                  Log in
                </Button>
                <Button onClick={() => signIn()}>Sign up</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
