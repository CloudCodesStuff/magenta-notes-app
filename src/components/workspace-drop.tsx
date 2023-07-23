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
import { Workspace } from '@prisma/client'
import { trpc, type RouterOutput } from '@/lib/trpc'

type MutationOutput = RouterOutput['workspaces']['deleteWorkspace']
export interface CreateWorkspaceDialogProps {
  onError?: (error: unknown, variables: unknown, context: unknown) => void
  onSuccess?: (data: MutationOutput, variables: unknown, context: unknown) => void
}

interface WorkspaceItemProps {
  workspace: Pick<Workspace, 'id' | 'name' | 'description' | 'userId' | 'createdAt' | 'updatedAt'>
}

export function DeleteWorkspace({ workspace }: WorkspaceItemProps) {
  const utils = trpc.useContext()
  const mutation = trpc.workspaces.deleteWorkspace.useMutation()

  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/dashboard/${workspace.id}`} className="flex w-full">
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-red-600 focus:text-red-600 text-destructive focus:text-destructive"
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
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                mutation.mutate(workspace.id, {
                  onSuccess() {
                    utils.workspaces.getWorkspacesForCurrentUser.invalidate()
                  },
                })
                console.log('dytf')
                setIsDeleteLoading(false)
                setShowDeleteAlert(false)
                // router.refresh()
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
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
