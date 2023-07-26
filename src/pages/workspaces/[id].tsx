import Link from 'next/link'
import { useMemo } from 'react'
import { Pen } from 'lucide-react'
import { useRouter } from 'next/router'
import { trpc } from '@/lib/trpc'
import { formatDate } from '@/lib/formatdate'
import { Card } from '@/components/ui/card'
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

  return (
    <div className="w-full p-10">
      <div className="max-w-6xl mx-auto flex flex-1 flex-col overflow-hidden">
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
                onSuccess={(data) => router.push(`/workspaces/notes/${data.id}`)}
              />
            </DialogContent>
          </Dialog>

          <div>
            {notes.data?.length ? (
              <div className="divide-y p-4 flex gap-2 flex-wrap dotted  divide-border rounded-md border">
                {notes.data.map((note) => (
                  <Card
                    key={note.id}
                    className="w-60 bg-background h-60 overflow-hidden justify-between shadow-md relative flex flex-col"
                  >
                    <div className="flex flex-grow flex-col">
                      <div
                        className="p-4 mb-1 w-full"
                        style={{ backgroundColor: note.color || 'gray' }}
                      />

                      <div className="flex px-4 py-3 flex-grow">
                        <h1 className="font-semibold">{note.title}</h1>
                      </div>

                      <div className="flex px-4 py-3 justify-between">
                        <h1 className="my-auto text-muted-foreground">
                          {formatDate(note.createdAt?.toDateString())}
                        </h1>
                        <Button className="rounded-full w-10 h-10 p-2 flex" asChild>
                          <Link href={`/workspaces/notes/${note.id}`}>
                            <Pen className="w-5 h-6" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
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
    </div>
  )
}
