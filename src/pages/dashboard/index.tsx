import { NotespaceItem } from '@/components/notespaceitem'
import { trpc } from '@/lib/trpc'

export const metadata = {
  title: 'Dashboard',
}

export default function Dashboard() {
  const workspaces = trpc.workspaces.getWorkspacesForCurrentUser.useQuery()

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto">
        {workspaces.data?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {workspaces.data.map((workspace) => (
              <NotespaceItem key={workspace.id} notespace={workspace} />
            ))}
          </div>
        ) : (
          <div>No workspaces found.</div>
        )}
      </div>
    </div>
  )
}
