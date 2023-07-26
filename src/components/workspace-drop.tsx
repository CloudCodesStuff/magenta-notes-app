'use client'

import * as React from 'react'
import Link from 'next/link'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Loader2, MoreVertical, Trash2 } from 'lucide-react'
import { trpc } from '@/lib/trpc'
import { useToast } from './ui/use-toast'

interface Props {
  workspaceId: string
}

export function DeleteWorkspace({ workspaceId }: Props) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false)

  const { toast } = useToast()

  const utils = trpc.useContext()

  const mutation = trpc.workspaces.deleteWorkspace.useMutation()

  const handleDelete = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()

      mutation.mutate(workspaceId, {
        onSuccess() {
          utils.workspaces.getWorkspacesForCurrentUser.invalidate()
          toast({
            title: 'Workspace succesfully deleted.',
          })
        },
        onError() {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
          })
        },
      })

      setShowDeleteAlert(false)
    },
    [mutation, toast, setShowDeleteAlert, workspaceId, utils],
  )

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/workspaces/${workspaceId}`} className="flex w-full">
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center  text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive focus:ring-destructive"
            >
              {mutation.isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
