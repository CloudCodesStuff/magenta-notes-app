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
      NoteTags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  type NoteWithStar = (typeof allNotes)[number] & { starred?: boolean }

  const withStarredNotes = allNotes.map((note: NoteWithStar) => {
    note.starred = note.StarredNote.length > 0
    return note
  })

  return withStarredNotes
}
