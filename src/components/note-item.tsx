import { Note } from '@prisma/client'
import { formatDate } from '@/lib/formatdate'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Pen } from 'lucide-react'

interface NoteItemProps {
  note: Pick<Note, 'id' | 'color' | 'title' | 'content' | 'createdAt' | 'updatedAt'>
}

// Add an index signature to allow any string key
const colorVariants: Record<string, string> = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
  // Add more color variants as needed
}

export default function NoteItem({ note }: NoteItemProps) {
  const colorClass = note.color ? colorVariants[note.color] : ''

  return (
    <Card className="w-60 bg-background h-60 overflow-hidden justify-between shadow-md relative flex flex-col">
      <div className="flex flex-grow flex-col">
        {note.color ? (
          <div className={`${colorClass} p-4 mb-1 w-full`}></div>
        ) : (
          <div className="bg-muted p-4 mb-1 w-full"></div>
        )}
        <div className="flex px-4 py-3 flex-grow">
          <h1 className="font-semibold">{note.title}</h1>
        </div>

        <div className="flex px-4 py-3 justify-between">
          <h1 className="my-auto text-muted-foreground">
            {formatDate(note.createdAt?.toDateString())}
          </h1>
          <Button variant={'secondary'} className="rounded-full w-10 h-10 p-2 flex">
            <Pen className="w-5 h-6"></Pen>
          </Button>
        </div>
      </div>
    </Card>
  )
}
