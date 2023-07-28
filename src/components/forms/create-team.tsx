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
import { createTeamSchema, type CreateTeamInput } from '@/lib/schemas/create-team'
import { trpc, type RouterOutput } from '@/lib/trpc'
import { Loader2 } from 'lucide-react'

type MutationOutput = RouterOutput['teams']['createTeam']

export interface Props {
  onError?: (error: unknown, variables: unknown, context: unknown) => void
  onSuccess?: (data: MutationOutput, variables: unknown, context: unknown) => void
}

export default function CreateTeamForm(props: Props) {
  const form = useForm<CreateTeamInput>({
    resolver: zodResolver(createTeamSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const mutation = trpc.teams.createTeam.useMutation()

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
              <FormLabel>Team Name</FormLabel>
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
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {mutation.isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <span>Create</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
