import { db } from '@/lib/db'

export async function getAllTags() {
  const tags = await db.tag.findMany()
  return tags
}
