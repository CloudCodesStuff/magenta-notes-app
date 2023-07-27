import { db } from '@/lib/db'

/**
 * Find all notes of current workspace
 * @param workspaceId workspaces's id
 */

export async function getWorkspaceNotes(workspaceId: string) {
  const allNotes = await db.note.findMany({
    where: {
      workspaceId,
    },
    include: {
      StarredNote: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  const withStarredNotes = allNotes.map((note) => {
    return {
      ...note,
      starred: note.StarredNote.length > 0,
    }
  })

  return withStarredNotes
}
