import Link from 'next/link'
import { Note } from '@prisma/client'
import { formatDate } from '@/lib/formatdate'
import { Card } from './ui/card'

interface NoteItemProps {
    note: Pick<Note, "id" | "color" | "content" | "createdAt" | "updatedAt">
}

export function NoteItem({ note }: NoteItemProps) {
    return (
        <Card className='w-60 relative flex flex-col justify-start'>
            <div className='flex'><h1></h1></div>

        </Card>

    )
}
