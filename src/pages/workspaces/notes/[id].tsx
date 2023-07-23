import { useRouter } from 'next/router'
import { useMemo } from 'react'

export default function Page() {
  const router = useRouter()

  const noteId = useMemo(() => {
    return router.query.id?.toString()
  }, [router.query.id])

  if (noteId == null) {
    return <p>Error</p>
  }

  /**
   * TODO: endpoint for retrieving a single note by ID.
   * trpc.notes.getById.useQuery(noteId)
   */

  return (
    <div>
      <div>Note</div>
      <div>Note ID: {noteId}</div>
    </div>
  )
}
