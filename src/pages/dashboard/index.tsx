import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getAllWorkspaces } from '@/lib/services/workspaces/get-all';

export const metadata = {
    title: "Dashboard",
};

export default function Dashboard() {
    const { data: session } = useSession();
    const [workspaces, setWorkspaces] = useState<{ id: number; name: string; createdAt: Date }[]>([]);

    useEffect(() => {
        // Fetch workspaces from the database and set them in the state
        if (session?.user?.id) {
            getAllWorkspaces(session.user.id)
                .then((allWorkspaces) => {
                    setWorkspaces(allWorkspaces);
                })
                .catch((error) => {
                    console.error('Error fetching workspaces:', error);
                });
        }
    }, [session]);

    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto">
                {workspaces.length ? (
                    <div className="divide-y divide-border rounded-md border">
                        {workspaces.map((workspace) => (
                            <div key={workspace.id}>{workspace.name}</div>
                        ))}
                    </div>
                ) : (
                    <div>No workspaces found.</div>
                )}
            </div>
        </div>
    );
}
