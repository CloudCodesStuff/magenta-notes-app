import { db } from '@/lib/db'

/**
 * Find recent notes that the user has access to.
 */
export async function getRecentNotesForUser(userId: string) {
  const allNotes = await db.note.findMany({
    where: {
      OR: [
        { userId },
        {
          collaborators: {
            some: {
              userId,
            },
          },
        },
      ],
    },
    include: {
      StarredNote: {
        where: {
          userId,
        },
      },
      NoteTags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 10,
  })

  type NoteWithStar = (typeof allNotes)[number] & {
    starred?: boolean
    tags?: (typeof allNotes)[number]['NoteTags'][number]['tag'][]
  }

  const withStarredNotes = allNotes.map((note: NoteWithStar) => {
    note.starred = note.StarredNote.length > 0
    note.tags = note.NoteTags.map((noteTag) => noteTag.tag)
    return note
  })

  return withStarredNotes
}
