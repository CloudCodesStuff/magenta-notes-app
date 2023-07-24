import { NoteItem } from '@/components/noteitem'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/formatdate'
import { trpc } from '@/lib/trpc'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

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

  const mutation = trpc.notes.createNote.useMutation()

  const handleClick = async () => {
    mutation.mutate(
      { workspaceId, content: 'Edit note here' },
      {
        onSuccess(data) {
          router.push(`/workspaces/notes/${data.id}`)
        },
      },
    )
  }

  return (
    <div className="w-full">
      <button onClick={handleClick} className="bg-red-400 p-2 rounded">
        Add New Note
      </button>
      <div className="max-w-6xl mx-auto">
        <div>
          {notes.data?.length ? (
            <div className="divide-y divide-border rounded-md border">
              {notes.data.map((note) => (
                <NoteItem key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <h2 className="mt-6 text-xl font-semibold">No workspaces created</h2>
                <p className="mb-8 mt-2 text-center text-sm font-normal leading-6">
                  You don&apos;t have any workspaces yet. Create one and get planning!
                </p>
              </div>
            </div>
          )}
        </div>
        <div>
          <span>Raw Data</span>
          <pre>{JSON.stringify(notes.data, null, 2)}</pre>
        </div>

      </div>
    </div>
  )
}
