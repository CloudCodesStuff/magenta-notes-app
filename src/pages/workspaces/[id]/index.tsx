import Link from 'next/link'
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
import { Plus, ChevronRight } from 'lucide-react'
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

      <div className="max-w-6xl mx-auto flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-col gap-4 justify-center">
          <Button asChild variant="ghost" className="py-8">
            <Link href={`/workspaces/${workspaceId}/notes`}>
              <span className="text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-700 via-pink-800 to-indigo-500">
                Notes
              </span>
              <ChevronRight className="font-extrabold h-12 w-12 " />
            </Link>
          </Button>

          <div className="grid items-start gap-8">
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

            <div>
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

        <div className="my-8" />

        <div className="flex flex-col gap-4 justify-center">
          <Button asChild variant="ghost" className="py-8">
            <Link href={`/workspaces/${workspaceId}/collaborators`}>
              <span className="text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-stone-400 via-yellow-600 to-purple-800">
                Collaborators
              </span>
              <ChevronRight className="font-extrabold h-12 w-12 " />
            </Link>
          </Button>

          <div>TODO</div>
        </div>
      </div>
    </div>
  )
}
