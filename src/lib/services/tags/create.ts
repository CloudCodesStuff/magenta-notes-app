import { db } from '@/lib/db'

export async function createTag(name: string, userId: string) {
  const existingTag = await db.tag.findFirst({
    where: {
      userId,
      name,
    },
  })

  if (existingTag != null) {
    return existingTag
  }

  const result = await db.tag.create({
    data: {
      name,
      userId,
    },
  })

  return result
}
