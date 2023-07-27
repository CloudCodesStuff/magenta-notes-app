import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createNoteSchema, type CreateNoteData } from '@/lib/schemas/create-note'
import { trpc, type RouterOutput } from '@/lib/trpc'

type MutationOutput = RouterOutput['notes']['createNote']

export interface Props {
  workspaceId: string
  onError?: (error: unknown, variables: unknown, context: unknown) => void
  onSuccess?: (data: MutationOutput, variables: unknown, context: unknown) => void
}

export default function CreateNoteForm(props: Props) {
  const form = useForm<CreateNoteData>({
    resolver: zodResolver(createNoteSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      color: '',
      workspaceId: props.workspaceId,
    },
  })

  const mutation = trpc.notes.createNote.useMutation()

  const onSubmit = form.handleSubmit(async (data) => {
    mutation.mutate(data, {
      onSuccess: props.onSuccess,
      onError: props.onError,
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workspaceId"
          render={({ field }) => <Input {...field} type="hidden" />}
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}
