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

  return starredNotes
}
