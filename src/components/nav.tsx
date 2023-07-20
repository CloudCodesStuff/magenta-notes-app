'use client'

import { Link, NavigationMenuItem } from '@radix-ui/react-navigation-menu'
import { Button } from './ui/button'
import {
  NavigationMenu,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'

const Nav = () => {
  return (
    <nav className="container mb-7 ">
      <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
        <div className="flex gap-6 md:gap-10">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/docs" className={navigationMenuTriggerStyle()}>
                  test
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" className={navigationMenuTriggerStyle()}>
                  Features
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" className={navigationMenuTriggerStyle()}>
                  Documentation
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-3">
            <a href="/api/auth/signin">Log In</a>
            <Button variant="default">Sign up</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
