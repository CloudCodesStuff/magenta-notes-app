
import { useSession } from 'next-auth/react'

import { db } from '@/lib/db'
export const metadata = {
    title: "Dashboard",
}

export default function Dashboard() {
    const { data: session } = useSession()


    async function getNotes() {
        const notespaces = await db.notespace.findMany({
            where: {
                userId: session?.user.id,
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        })
        return notespaces
    }
    console.log(getNotes())


    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto">

            </div>
        </div>
    )
}
