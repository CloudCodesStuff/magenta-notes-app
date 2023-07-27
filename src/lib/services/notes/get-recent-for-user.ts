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
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: 10,
  })

  const withStarredNotes = allNotes.map((note) => {
    return {
      ...note,
      starred: note.StarredNote.length > 0,
    }
  })

  return withStarredNotes
}
