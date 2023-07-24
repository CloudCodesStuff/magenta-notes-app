import Link from 'next/link'
import { Note } from '@prisma/client'
import { formatDate } from '@/lib/formatdate'
import { Card } from './ui/card'

interface NoteItemProps {
    note: Pick<Note, "id" | "color" | "content" | "createdAt" | "updatedAt">
}

export function NoteItem({ note }: NoteItemProps) {
    return (
        <Card>

        </Card>

    )
}
