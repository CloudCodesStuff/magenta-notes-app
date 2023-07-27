import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { trpc } from '@/lib/trpc'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import CreateNoteForm from '@/components/forms/create-note'
import { BreadCrumbs } from '@/components/bread-crumbs'
import { StickyNote } from '@/components/sticky-note'

export const metadata = {
  title: 'Workspace',
}

export default function Page() {
  const router = useRouter()

  const workspaceId = useMemo(() => {
    return router.query.id?.toString()
  }, [router.query.id])

  if (workspaceId == null) {
    return <p>Error</p>
  }

  const notes = trpc.notes.getNotesForWorkspace.useQuery(workspaceId)

  const utils = trpc.useContext()

  return (
    <div className="p-10">
      <div className="my-2">
        <BreadCrumbs />
      </div>

      <div className="max-w-6xl mx-auto gap-8 flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-4xl">Notes</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Create and manage notes in this workspace.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Note</DialogTitle>
                <DialogDescription>Describe your new note</DialogDescription>
              </DialogHeader>
              <CreateNoteForm
                workspaceId={workspaceId}
                onSuccess={(data) => {
                  utils.notes.invalidate()
                  router.push(`/workspaces/${workspaceId}/notes/${data.id}`)
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden">
          {notes.data?.length ? (
            <div
              className="divide-y p-4 flex gap-4 flex-wrap divide-border rounded-md border"
              style={{
                backgroundImage: 'radial-gradient(gray 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            >
              {notes.data.map((note) => (
                <div key={note.id} className="w-60">
                  <StickyNote {...note} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <h2 className="mt-6 text-xl font-semibold">No notes created</h2>
                <p className="mb-8 mt-2 text-center text-sm font-normal leading-6">
                  You don&apos;t have any notes yet. Create one and get planning!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
