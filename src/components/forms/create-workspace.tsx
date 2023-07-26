import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createWorkspaceSchema, type CreateWorkspaceData } from '@/lib/schemas/create-workspace'
import { trpc, type RouterOutput } from '@/lib/trpc'

type MutationOutput = RouterOutput['workspaces']['createWorkspace']

export interface Props {
  onError?: (error: unknown, variables: unknown, context: unknown) => void
  onSuccess?: (data: MutationOutput, variables: unknown, context: unknown) => void
}

export default function CreateWorkspaceForm(props: Props) {
  const form = useForm<CreateWorkspaceData>({
    resolver: zodResolver(createWorkspaceSchema),
    mode: 'onBlur',
  })

  const mutation = trpc.workspaces.createWorkspace.useMutation()

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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormDescription>
                (Optional) Additional information about your workspace.
              </FormDescription>

              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}
