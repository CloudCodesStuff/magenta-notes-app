import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,

    DropdownMenuItem,
    DropdownMenuLabel,

    DropdownMenuSeparator,

    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { LogOut } from "lucide-react";
export default function Navavatar() {
    const getInitials = (name: string) => {
        const names = name.split(" ");
        return names
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase();
    };
    const { data: session } = useSession()

    if (session) {
        return (
            <>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                                <AvatarFallback>{getInitials(session.user.name || '')}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{session.user.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {session.user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                        <DropdownMenuItem onClick={() => signOut()}>
                            <LogOut className="w-5 h-5" />   Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </>
        )
    }
    return (
        <>
            <Button onClick={() => signIn()}>Sign in</Button>

        </>
    )
}