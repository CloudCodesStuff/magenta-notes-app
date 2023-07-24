import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { trpc } from '@/lib/trpc'
import NoteItem from '@/components/note-item'

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
    console.log('test')
    mutation.mutate(
      { workspaceId, content: 'Edit note here', title: 'Test title' },
      {
        onSuccess(data) {
          router.push(`/workspaces/notes/${data.id}`)
        },
      },
    )
  }

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto flex flex-1 flex-col overflow-hidden">
        <div className="grid items-start gap-8">
          <button onClick={handleClick} className="bg-red-400 p-2 rounded">
            Add New Note
          </button>
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
                  <h2 className="mt-6 text-xl font-semibold">No notes created</h2>
                  <p className="mb-8 mt-2 text-center text-sm font-normal leading-6">
                    You don&apos;t have any notes yet. Create one and get planning!
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
    </div>
  )
}
