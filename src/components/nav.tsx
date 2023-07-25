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
import ThemeToggle from './theme-toggle'

export default function Nav() {
  const { data: session } = useSession()

  return (
    <nav className="px-7 bg-surface-100-800-token">
      <div className="flex w-full items-center mx-auto justify-between border-b border-b-slate-200 py-4">
        <div className="flex gap-6 md:gap-10">
          <NavigationMenu>
            <NavigationMenuList className="hidden sm:flex">
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/examples/form" className={navigationMenuTriggerStyle()}>
                  Examples
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/editor" className={navigationMenuTriggerStyle()}>
                  Editor
                </NavigationMenuLink>
              </NavigationMenuItem>
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
