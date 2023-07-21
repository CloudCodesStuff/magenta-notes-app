import { useForm } from 'react-hook-form'
import { trpc } from '@/lib/trpc'
import Cta from '@/components/cta'
import Features from '@/components/features'
import Hero from '@/components/hero'
import Nav from '@/components/nav'

/**
 * Example user ID of notes.
 */
const myId = 'elysia'

export default function Home() {
  /**
   * This query fetches data and displays it.
   */
  const query = trpc.getNoteZod.useQuery(myId)

  /**
   * When this mutation is invoked, a POST request is made to update the database.
   */
  const mutation = trpc.addNoteArktype.useMutation()

  /**
   * Utilities are available to `invalidate` the previous query, causing it to refresh its data.
   */
  const utils = trpc.useContext()

  const { register, handleSubmit } = useForm<{ note: string }>()

  const onSubmit = handleSubmit(async ({ note }) => {
    await mutation.mutateAsync({ id: myId, note })

    /**
     * Invalidate the previous query, causing it to refetch.
     * If this isn't invoked, the displayed  query data will remain the same.
     */
    utils.getNoteZod.invalidate(myId)
  })

  return (
    <div className="w-full">
      <div className="border flex gap-4 p-4 items-center">
        <span>Notes: {query.data}</span>
        <form onSubmit={onSubmit}>
          <input {...register('note')} className="border m-2" />
          <button type="submit" className="bg-red-400 rounded p-2">
            Set New Note
          </button>
        </form>
      </div>

      <div className="max-w-6xl mx-auto">
        <Nav />
        <Hero />
        <Features />
        <Cta />
      </div>
    </div>
  )
}
