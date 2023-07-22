import Link from "next/link"
import { Notespace } from "@prisma/client"
import { formatDate } from "@/lib/formatdate"

interface NotespaceItemProps {
    notespace: Pick<Notespace, "id" | "name" | "description" | "userId" | "createdAt" | "updatedAt">
}

export function NotespaceItem({ notespace }: NotespaceItemProps) {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="grid gap-1">
                <Link
                    href={`/dashboard/${notespace.id}`}
                    className="font-semibold hover:underline"
                >
                    {notespace.name}
                </Link>
                <div>
                    <p className="text-sm text-muted-foreground">
                        {formatDate(notespace.createdAt?.toDateString())}
                    </p>
                </div>
            </div>
        </div>
    )
}
