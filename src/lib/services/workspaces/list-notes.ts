import { db } from '@/lib/db'

/**
 * List all notes for a given workspace.
 * @param workspaceId The workspace id.
 */
export async function listNotesForWorkspace(workspaceId: string) {
  const notes = await db.note.findMany({
    where: {
      workspaceId,
    },
  })
  return notes
}
