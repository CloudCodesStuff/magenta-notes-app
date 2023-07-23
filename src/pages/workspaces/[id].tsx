import { trpc } from '@/lib/trpc'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export const metadata = {
  title: 'Notespace',
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
      { workspaceId, content: 'Hello World' },
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
          <span>Raw Data</span>
          <pre>{JSON.stringify(notes.data, null, 2)}</pre>
        </div>
        {notes.data?.map((note) => (
          <div key={note.id} className="p-2">
            <span>ID: {note.id}</span>
            <div>Content: {note.content?.toString()}</div>
            <div>Color: {note.color}</div>
            <div>Created At: {note.createdAt.toLocaleString('en-us')}</div>
            <div className="border-b" />
          </div>
        ))}
      </div>
    </div>
  )
}
