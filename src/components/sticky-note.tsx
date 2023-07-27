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
import { Pen, MoreVertical } from 'lucide-react'
import { trpc } from '@/lib/trpc'
import { useMemo } from 'react'

export interface Props {
  id: string
  workspaceId: string
  title: string
  color?: string | null
  updatedAt: Date
  tags?: string[]
}

export function StickyNote(note: Props) {
  const mutation = trpc.notes.deleteNote.useMutation()

  const utils = trpc.useContext()

  const handleDelete = (id: string) => {
    return () => {
      mutation.mutate(id, {
        onSuccess() {
          utils.notes.getNotesForWorkspace.invalidate()
        },
      })
    }
  }

  const color = useMemo(() => {
    return fontColorContrast(note.color || 'gray')
  }, [note.color])

  const hover = useMemo(() => {
    const contrastColor = fontColorContrast(note.color || 'gray')
    return contrastColor === '#000000' ? 'hover:bg-muted' : 'hover:bg-slate-500'
  }, [note.color])

  return (
    <Card style={{ backgroundColor: note.color || 'gray', borderColor: note.color || 'gray' }}>
      <CardHeader className="flex flex-row items-center justify-between" style={{ color }}>
        <CardTitle className="truncate">{note.title}</CardTitle>

        <DropdownMenu>
          <DropdownMenuTrigger
            className={`p-2 flex items-center justify-center rounded-md border ${hover}`}
            style={{ borderColor: color }}
          >
            <div>
              <MoreVertical className="h-4 w-4" />
            </div>
            <span className="sr-only">Open</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/workspaces/${note.workspaceId}/notes/${note.id}`}
                className="cursor-pointer"
              >
                Edit
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex cursor-pointer items-center  text-destructive focus:text-destructive"
              onClick={handleDelete(note.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2 justify-between" style={{ color }}>
          <p className="truncate">{note.updatedAt.toLocaleTimeString('en-us')}</p>
          <p className="truncate">{note.updatedAt.toLocaleDateString('en-us')}</p>
        </div>
      </CardContent>

      <CardFooter>
        <Button size="sm" className="ml-auto rounded-full w-10 h-10 p-2 flex" asChild>
          <Link href={`/workspaces/${note.workspaceId}/notes/${note.id}`}>
            <Pen className="w-5 h-6" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
