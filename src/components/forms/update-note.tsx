import { SketchPicker } from 'react-color'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { updateNoteSchema, type UpdateNoteInput } from '@/lib/schemas/update-note'
import { trpc, type RouterOutput } from '@/lib/trpc'
import { Tag, TagComboboxInput } from '../tag-combo-box'

type MutationOutput = RouterOutput['notes']['updateNote']

export interface Props {
  id: string
  title?: string
  color?: string | null
  tags?: Tag[]
  onError?: (error: unknown, variables: unknown, context: unknown) => void
  onSuccess?: (data: MutationOutput, variables: unknown, context: unknown) => void
}

export default function UpdateNoteForm(props: Props) {
  const form = useForm<UpdateNoteInput>({
    resolver: zodResolver(updateNoteSchema),
    mode: 'onSubmit',
    defaultValues: {
      id: props.id,
      title: props.title ?? '',
      color: props.color ?? '',
      tags: props.tags ?? [],
    },
  })

  const mutation = trpc.notes.updateNote.useMutation()

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
                <SketchPicker
                  color={field.value}
                  onChange={(color) => {
                    field.onChange(color.hex)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id"
          render={({ field }) => <Input {...field} type="hidden" />}
        />

        <FormField
          control={form.control}
          name="id"
          render={({ field }) => <Input {...field} type="hidden" />}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => <TagComboboxInput {...field} initialValue={props.tags} />}
        />

        <Button type="submit">
          {mutation.isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span>Update</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
