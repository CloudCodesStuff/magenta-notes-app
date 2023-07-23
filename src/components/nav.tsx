import { Button } from './ui/button'
import {
  NavigationMenuLink,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'

export default function Nav() {
  return (
    <nav className="container mb-7 ">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
        <div className="flex gap-6 md:gap-10">
          <NavigationMenu>
            <NavigationMenuList>
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
        <div className="flex gap-4">
          <div></div>
          <div className="flex gap-3">
            <Button variant={'secondary'}>Log in</Button>
            <Button variant={'default'}>Sign up</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
