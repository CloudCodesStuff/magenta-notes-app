import { db } from '@/lib/db'

export async function deleteTag(id: string) {
  const result = await db.tag.delete({ where: { id } })
  return result
}
