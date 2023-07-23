import Link from 'next/link'
import { Workspace } from '@prisma/client'
import { formatDate } from '@/lib/formatdate'
import { DeleteWorkspace } from './workspace-drop'

interface WorkspaceItemProps {
  workspace: Pick<Workspace, 'id' | 'name' | 'description' | 'userId' | 'createdAt' | 'updatedAt'>
}

export function WorkspaceItem({ workspace }: WorkspaceItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <div>
          <Link href={`/workspaces/${workspace.id}`} className="font-semibold hover:underline">
            {workspace.name}
          </Link>
          <p className="text-sm">{workspace.description}</p>
        </div>
        <div className="mt-1">
          <p className="text-sm">{formatDate(workspace.createdAt?.toDateString())}</p>
        </div>
      </div>
      <DeleteWorkspace workspace={workspace}></DeleteWorkspace>
    </div>
  )
}
