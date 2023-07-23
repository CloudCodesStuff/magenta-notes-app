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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { createWorkspaceSchema, type CreateWorkspaceData } from '@/lib/schemas/create-workspace'
import { trpc, type RouterOutput } from '@/lib/trpc'

type MutationOutput = RouterOutput['workspaces']['createWorkspace']

export interface CreateWorkspaceDialogProps {
  onError?: (error: unknown, variables: unknown, context: unknown) => void
  onSuccess?: (data: MutationOutput, variables: unknown, context: unknown) => void
}

export function CreateWorkspaceDialog(props: CreateWorkspaceDialogProps) {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4"></Plus>
          New Workspace
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New workspace</DialogTitle>
          <DialogDescription>Describe your new workspace</DialogDescription>
        </DialogHeader>

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
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
