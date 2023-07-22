import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'; // Import useState and useEffect

import { db } from '@/lib/db'

export const metadata = {
    title: "Dashboard",
}

type Notespace = {
    id: number;
    name: string;
    createdAt: Date;
};

export default function Dashboard() {
    const { data: session, status } = useSession(); // Destructure `status` to check if it's "loading" or "error"
    const [notespaces, setNotespaces] = useState<Notespace[]>([]); // State to store notespaces

    // Move getNotes inside useEffect to run once the component mounts
    useEffect(() => {
        async function getNotes() {
            if (session?.user?.id) {
                try {
                    const notespaces = await db.notespace.findMany({
                        where: {
                            userId: session.user.id,
                        },
                        select: {
                            id: true,
                            name: true,
                            createdAt: true,
                        },
                        orderBy: {
                            updatedAt: "desc",
                        },
                    });
                    setNotespaces(notespaces); // Update the state with the retrieved notes
                } catch (error) {
                    console.error("Error fetching notes:", error);
                }
            }
        }
        getNotes();
    }, [session]); // Run the effect whenever the session changes

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return <div>Please log in to access this page.</div>;
    }

    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto">
                {notespaces.length ? (
                    <div className="divide-y divide-border rounded-md border">
                        {notespaces.map((notespace) => (
                            <div key={notespace.id}>{notespace.name}</div>
                        ))}
                    </div>
                ) : (
                    <div>No notespaces found.</div>
                )}
            </div>
        </div>
    );
}
