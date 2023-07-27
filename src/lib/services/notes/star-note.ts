import { db } from '@/lib/db'
import { StarNoteInput } from '@/lib/schemas/star-note'

export async function starNote(input: StarNoteInput) {
  if (input.starred) {
    const newOrUpdatedNote = await db.starredNote.upsert({
      where: {
        userId_noteId: {
          userId: input.userId,
          noteId: input.noteId,
        },
      },
      create: {
        userId: input.userId,
        noteId: input.noteId,
      },
      update: {
        userId: input.userId,
        noteId: input.noteId,
      },
    })

    return newOrUpdatedNote
  } else {
    const deletedNote = await db.starredNote.delete({
      where: {
        userId_noteId: {
          userId: input.userId,
          noteId: input.noteId,
        },
      },
    })
    return deletedNote
  }
}
