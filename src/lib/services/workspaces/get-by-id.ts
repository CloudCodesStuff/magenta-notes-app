import { db } from '@/lib/db'

export async function getWorkspaceById(id: string) {
  const workspace = await db.workspace.findFirst({
    where: {
      id,
    },
    include: {
      collaborators: {
        include: {
          user: true,
        },
      },
    },
  })

  return workspace
}
