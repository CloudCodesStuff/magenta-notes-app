import Link from 'next/link'
import { useMemo } from 'react'
import { Pen } from 'lucide-react'
import { useRouter } from 'next/router'
import { trpc } from '@/lib/trpc'
import { formatDate } from '@/lib/formatdate'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import { BreadCrumbs } from '@/components/bread-crumbs'

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

  const mutation = trpc.notes.deleteNote.useMutation()

  const utils = trpc.useContext()

  const handleDelete = (id: string) => {
    return () => {
      mutation.mutate(id, {
        onSuccess() {
          utils.notes.getNotesForWorkspace.invalidate()
        },
      })
    }
  }

  return (
    <div className="p-10">
      <div className="my-2">
        <BreadCrumbs />
      </div>
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
                onSuccess={(data) => router.push(`/workspaces/${workspaceId}/notes/${data.id}`)}
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
                    <CardHeader>
                      <div
                        className="p-4 mb-1 w-full"
                        style={{ backgroundColor: note.color || 'gray' }}
                      />

                      <div className="flex items-center justify-between">
                        <CardTitle>{note.title}</CardTitle>

                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open</span>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/workspaces/${workspaceId}/notes/${note.id}`}
                                className="cursor-pointer"
                              >
                                Edit
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              className="flex cursor-pointer items-center  text-destructive focus:text-destructive"
                              onClick={handleDelete(note.id)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <CardDescription>
                        {formatDate(note.createdAt?.toDateString())}
                      </CardDescription>
                    </CardHeader>

                    <CardFooter>
                      <Button size="sm" className="ml-auto rounded-full w-10 h-10 p-2 flex" asChild>
                        <Link href={`/workspaces/${workspaceId}/notes/${note.id}`}>
                          <Pen className="w-5 h-6" />
                        </Link>
                      </Button>
                    </CardFooter>
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
