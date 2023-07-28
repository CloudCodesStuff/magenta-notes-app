import Link from 'next/link'
import fontColorContrast from 'font-color-contrast'
import { Button } from '@/components/ui/button'
import { Card, CardFooter, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DropdownMenuDialogItem,
} from '@/components/ui/dialog'
import { Pen, MoreVertical, Star, Plus, Trash2 } from 'lucide-react'
import { trpc } from '@/lib/trpc'
import { useMemo } from 'react'
import UpdateNoteForm from './forms/update-note'

export interface Props {
  id: string
  workspaceId: string
  starred?: boolean
  title: string
  color?: string | null
  updatedAt: Date
  tags?: string[]
}

export function StickyNote(note: Props) {
  const deleteMutation = trpc.notes.deleteNote.useMutation()

  const starMutation = trpc.notes.starNote.useMutation()

  const utils = trpc.useContext()

  const handleDelete = (id: string) => {
    return () => {
      deleteMutation.mutate(id, {
        onSuccess() {
          utils.notes.getNotesForWorkspace.invalidate()
        },
      })
    }
  }

  const toggleStar = () => {
    starMutation.mutate(
      {
        noteId: note.id,
        starred: !note.starred,
      },
      {
        onSuccess() {
          utils.notes.invalidate()
        },
      },
    )
  }

  const color = useMemo(() => {
    return fontColorContrast(note.color || 'gray')
  }, [note.color])

  const hover = useMemo(() => {
    const contrastColor = fontColorContrast(note.color || 'gray')
    return contrastColor === '#000000' ? 'hover:bg-muted' : 'hover:bg-slate-500'
  }, [note.color])

  const starredClasses = useMemo(() => {
    return note.starred ? `fill-yellow-500 hover:fill-transparent` : `hover:fill-yellow-500`
  }, [note.starred])

  return (
    <Card style={{ backgroundColor: note.color || 'gray', borderColor: note.color || 'gray' }}>
      <CardHeader className="flex flex-row gap-2 items-center justify-between" style={{ color }}>
        <CardTitle className="truncate py-2">{note.title}</CardTitle>

        <button className="" onClick={toggleStar}>
          <Star className={starredClasses} />
        </button>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2 justify-between" style={{ color }}>
          <p className="truncate">{note.updatedAt.toLocaleTimeString('en-us')}</p>
          <p className="truncate">{note.updatedAt.toLocaleDateString('en-us')}</p>
        </div>
      </CardContent>

      <CardFooter>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={`p-2 flex items-center justify-center rounded-md border ${hover}`}
            style={{ borderColor: color, color }}
          >
            <div>
              <MoreVertical className="h-4 w-4" />
            </div>
            <span className="sr-only">Open</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuDialogItem
              triggerChildren={
                <Button variant="ghost">
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Update Note</span>
                </Button>
              }
            >
              <DialogHeader>
                <DialogTitle>Update Note</DialogTitle>
                <DialogDescription>Edit the initial settings</DialogDescription>
              </DialogHeader>
              <UpdateNoteForm
                id={note.id}
                title={note.title}
                color={note.color}
                onSuccess={() => {
                  utils.notes.invalidate()
                }}
              />
            </DropdownMenuDialogItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Button variant="ghost" asChild>
                <Link
                  href={`/workspaces/${note.workspaceId}/notes/${note.id}`}
                  className="cursor-pointer"
                >
                  <Pen className="mr-2 h-4 w-4" />
                  <span>Edit Content</span>
                </Link>
              </Button>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Button
                onClick={handleDelete(note.id)}
                variant="destructive"
                className="w-full cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button size="sm" className="ml-auto rounded-full w-10 h-10 p-2 flex" asChild>
          <Link href={`/workspaces/${note.workspaceId}/notes/${note.id}`}>
            <Pen className="w-5 h-6" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
