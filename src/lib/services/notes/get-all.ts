import { db } from '@/lib/db'

/**
 * Find all workspaces.
 */
export async function getAllNotes() {
  const allNotes = await db.note.findMany({
    select: {
      id: true,
      color: true,
      content: true,
      workspace: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return allNotes
}
