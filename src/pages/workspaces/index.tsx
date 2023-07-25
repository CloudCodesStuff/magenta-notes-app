import { File } from 'lucide-react'
import { useRouter } from 'next/router'
import {
  CreateWorkspaceDialog,
  type CreateWorkspaceDialogProps,
} from '@/components/workspace-create'
import { WorkspaceItem } from '@/components/workspace-item'
import { trpc } from '@/lib/trpc'

export const metadata = {
  title: 'Dashboard',
}

export default function Page() {
  const workspaces = trpc.workspaces.getWorkspacesForCurrentUser.useQuery()

  const router = useRouter()

  const onSuccess: CreateWorkspaceDialogProps['onSuccess'] = async (data) => {
    router.push(`/workspaces/${data.id}`)
  }

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto flex flex-1 flex-col overflow-hidden">
        <div className="grid items-start gap-8">
          <div className="flex items-center justify-between px-2">
            <div className="grid gap-1">
              <h1 className="font-bold text-3xl md:text-4xl">Workspaces</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Create and manage workspaces.
              </p>
            </div>
            <CreateWorkspaceDialog onSuccess={onSuccess} />
          </div>
          {workspaces.data?.length ? (
            <div className="divide-y divide-border  rounded-md border">
              {workspaces.data.map((workspace) => (
                <WorkspaceItem key={workspace.id} workspace={workspace} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <File className="h-10 w-10" />
                <h2 className="mt-6 text-xl font-semibold">No workspaces created</h2>
                <p className="mb-8 mt-2 text-center text-sm font-normal leading-6">
                  You don&apos;t have any workspaces yet. Create one and get planning!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
