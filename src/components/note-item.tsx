import { Note } from '@prisma/client'
import { Card } from './ui/card'

interface NoteItemProps {
  note: Pick<Note, 'id' | 'color' | 'content' | 'createdAt' | 'updatedAt'>
}

export default function NoteItem({ note }: NoteItemProps) {
  return (
    <Card className="w-60 relative flex flex-col justify-start">
      <div className="flex">
        <h1>{note.id}</h1>
      </div>
    </Card>
  )
}
