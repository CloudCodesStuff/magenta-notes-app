import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

prisma ??= new PrismaClient()

export const db = prisma
