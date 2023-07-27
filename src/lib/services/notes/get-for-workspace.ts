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
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return allNotes
}
