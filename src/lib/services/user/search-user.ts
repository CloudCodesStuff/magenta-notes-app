import { db } from '@/lib/db'

export async function searchUser(name: string) {
  const searchUser = await db.user.findMany({ where: { name: { search: name } } })
  return searchUser
}
