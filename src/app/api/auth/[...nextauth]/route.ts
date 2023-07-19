import NextAuth from "next-auth"
import { nextAuthOptions } from "@/lib/auth"

const handler = NextAuth(nextAuthOptions)

export const GET = handler

export const POST = handler
