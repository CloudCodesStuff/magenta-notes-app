import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { trpc } from '@/lib/trpc'
import { useCallback, FormEvent } from 'react'
import { Loader2 } from 'lucide-react'

export function CreateTagForm() {
  const mutation = trpc.tags.create.useMutation()

  const utils = trpc.useContext()

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      mutation.mutate(event.currentTarget.tag.value, {
        onSuccess() {
          utils.tags.invalidate()
        },
      })
    },
    [mutation],
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input type="text" name="tag" />
      <Button type="submit">
        {mutation.isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <span>Create</span>
        )}
      </Button>
    </form>
  )
}
