import Link from "next/link"
import { Workspace } from "@prisma/client"
import { formatDate } from "@/lib/formatdate"

interface WorkspaceItemProps {
    workspace: Pick<Workspace, "id" | "name" | "description" | "userId" | "createdAt" | "updatedAt">
}

export function WorkspaceItem({ workspace }: WorkspaceItemProps) {
    return (
        <div className="flex items-center justify-between p-4">
            <div className="grid gap-1">
                <Link
                    href={`/dashboard/${workspace.id}`}
                    className="font-semibold hover:underline"
                >
                    {workspace.name}
                </Link>
                <p>{workspace.description}</p>
                <div className="mt-1">
                    <p className="text-sm text-muted-foreground">
                        {formatDate(workspace.createdAt?.toDateString())}
                    </p>
                </div>
            </div>
        </div>
    )
}
