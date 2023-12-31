import { db } from '@/lib/db'

/**
 * Find all Starred notes for a specific user.
 * @param userId The user's ID.
 */
export async function getStarredNotesforUser(userId: string) {
  const starredNotes = await db.starredNote.findMany({
    where: {
      userId,
    },
    select: {
      note: true,
    },
  })

  type NoteWithStar = (typeof starredNotes)[number]['note'] & { starred?: boolean }

  const withStars = starredNotes.map((starredNote) => {
    const note: NoteWithStar = starredNote.note
    note.starred = true
    return note
  })

  return withStars
}
