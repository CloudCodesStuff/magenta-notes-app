import Link from 'next/link'
import { File, Plus } from 'lucide-react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { trpc } from '@/lib/trpc'
import { formatDate } from '@/lib/formatdate'
import { DeleteWorkspace } from '@/components/workspace-drop'
import CreateWorkspaceForm from '@/components/forms/create-workspace'

export const metadata = {
  title: 'Dashboard',
}

export default function Page() {
  const workspaces = trpc.workspaces.getWorkspacesForCurrentUser.useQuery()

  const utils = trpc.useContext()

  const router = useRouter()

  return (
    <div className="w-full p-10">
      <div className="max-w-6xl mx-auto flex flex-1 flex-col overflow-hidden">
        <div className="grid items-start gap-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-4xl">Workspaces</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Create and manage workspaces.
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4"></Plus>
                  New Workspace
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>New workspace</DialogTitle>
                  <DialogDescription>Describe your new workspace</DialogDescription>
                </DialogHeader>
                <CreateWorkspaceForm
                  onSuccess={(data) => {
                    utils.workspaces.invalidate()
                    router.push(`/workspaces/${data.id}`)
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          {workspaces.data?.length ? (
            <div className="divide-y divide-border rounded border border-primary-500">
              {workspaces.data.map((workspace) => (
                <div
                  key={workspace.id}
                  className="flex items-center justify-between p-4 border-primary-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                >
                  <div className="grid gap-1">
                    <div>
                      <Link
                        href={`/workspaces/${workspace.id}`}
                        className="font-semibold hover:underline"
                      >
                        {workspace.name}
                      </Link>
                      <p className="text-sm">{workspace.description}</p>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm">{formatDate(workspace.createdAt?.toDateString())}</p>
                    </div>
                  </div>
                  <DeleteWorkspace workspaceId={workspace.id} />
                </div>
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
