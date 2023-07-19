"use client"

import { Link, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { Button } from "./ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { LogIn } from "lucide-react";

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
                    <div>


                    </div>
                    <div className="flex gap-3">
                        <Button variant={"secondary"}>Log in</Button>

                        <Button variant={"default"}>Sign up</Button>
                    </div>
                </div>


            </div>

        </nav>
    );
}

export default Nav;