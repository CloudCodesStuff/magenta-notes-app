import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useEditor } from '@/components/use-editor'
import { Loader2 } from 'lucide-react'
import { trpc } from '@/lib/trpc'
import { Button } from '@/components/ui/button'

export default function Page() {
  const router = useRouter()

  const noteId = useMemo(() => {
    return router.query.id?.toString() ?? '0'
  }, [router.query.id])

  const query = trpc.notes.getNote.useQuery(noteId, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const [ref, setRef] = useEditor({ content: query.data?.content as any })

  const mutation = trpc.notes.updateNote.useMutation()

  const handleSave = async () => {
    if (!ref.current) {
      return
    }

    mutation.mutate({
      id: noteId,
      content: await ref.current.save(),
    })
  }

  return (
    <div className="p-10">
      <div className="w-full flex">
        <div className="ml-auto">
          <Button onClick={handleSave}>
            {mutation.isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>SAVE</span>
            )}
          </Button>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="prose prose-stone dark:prose-invert mx-auto w-[800px]">
          <div ref={setRef} className="min-h-[500px]" />

          <p className="text-sm text-gray-500">
            Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open
            the command menu.
          </p>
        </div>
      </div>
    </div>
  )
}
