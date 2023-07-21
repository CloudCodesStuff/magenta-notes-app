import { useForm } from 'react-hook-form'
import { trpc } from '@/lib/trpc'

/**
 * Example workspace ID of notes.
 */
const workspaceId = 0

/**
 * Demo: use the same color for all notes.
 */
const color = 'red'

export default function Example() {
  /**
   * This query fetches data and displays it.
   */
  const query = trpc.example.getNote.useQuery(workspaceId)

  /**
   * When this mutation is invoked, a POST request is made to update the database.
   */
  const mutation = trpc.example.addNote.useMutation()

  /**
   * Utilities are available to `invalidate` the previous query, causing it to refresh its data.
   */
  const utils = trpc.useContext()

  const { register, handleSubmit } = useForm<{ content: string }>()

  const onSubmit = handleSubmit(async ({ content }) => {
    await mutation.mutateAsync({ workspaceId, content, color })

    /**
     * Invalidate the previous query, causing it to refetch.
     * If this isn't invoked, the displayed  query data will remain the same.
     */
    utils.example.getNote.invalidate(workspaceId)
  })

  return (
    <div className="border flex gap-4 p-4 items-center">
      <span>Notes: {query.data}</span>
      <form onSubmit={onSubmit}>
        <input {...register('content')} className="border m-2" />
        <button type="submit" className="bg-red-400 rounded p-2">
          Set New Note
        </button>
      </form>
    </div>
  )
}
