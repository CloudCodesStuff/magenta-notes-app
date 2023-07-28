import { db } from '@/lib/db'

export async function deleteTeam(id: string) {
  const result = await db.team.delete({ where: { id } })
  return result
}
