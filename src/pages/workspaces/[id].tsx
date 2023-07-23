import { trpc } from '@/lib/trpc'
import { useRouter } from 'next/router'

export const metadata = {
  title: 'Notespace',
}

export default function Page() {
  const router = useRouter()

  if (!router.query.id) {
    return <p>Error</p>
  }

  const notes = trpc.notes.getNotesForWorkspace.useQuery(router.query.id?.toString())

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto">
        <div>
          <span>Raw Data</span>
          <div>{JSON.stringify(notes.data)}</div>
        </div>
        {notes.data?.map((note) => (
          <div key={note.id}>
            <span>ID: {note.id}</span>
            <div>Content: {note.content?.toString()}</div>
            <div>Color: {note.color}</div>
            <div>Created At: {note.createdAt.toLocaleString('en-us')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
