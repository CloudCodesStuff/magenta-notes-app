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
    select: {
      id: true,
      color: true,
      content: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return allNotes
}
