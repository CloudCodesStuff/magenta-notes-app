import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'
import { BreadCrumbs } from '@/components/bread-crumbs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog'
import { UpdateTeamMembersForm } from '@/components/forms/update-team'
import { trpc } from '@/lib/trpc'
import { useMemo } from 'react'

export default function Page() {
  const router = useRouter()

  const workspaceId = useMemo(() => {
    return router.query.id?.toString()
  }, [router.query.id])

  const utils = trpc.useContext()

  const query = trpc.workspaces.getById.useQuery(workspaceId ?? '')

  const mutation = trpc.workspaces.updateCollaborators.useMutation({
    onSuccess() {
      utils.workspaces.invalidate()
    },
  })

  if (workspaceId == null) {
    return <p>Error</p>
  }

  return (
    <div className="p-10">
      <div className="my-2">
        <BreadCrumbs />
      </div>

      <Card className="max-w-6xl mx-auto">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-8">
          <div className="overflow-hidden">
            <CardTitle className="text-5xl truncate">Workspace Collaborators</CardTitle>
            <CardDescription>Collaborators for this workspace</CardDescription>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="whitespace-nowrap">Update Collaborators</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Note</DialogTitle>
                <DialogDescription>Edit the initial settings</DialogDescription>
              </DialogHeader>
              <UpdateTeamMembersForm
                initialValue={query.data?.collaborators.map((collaborator) => collaborator.user)}
                onSubmit={async (users) => {
                  mutation.mutate({
                    workspaceId,
                    userIds: users.map((user) => user.id),
                  })
                }}
              />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <h2 className="text-xl font-semibold">Members</h2>

          <div className="border my-2" />

          <ul className="flex flex-wrap gap-4">
            {query.data?.collaborators.map((collaborator) => (
              <li key={collaborator.userId} className="w-60">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-bold truncate">{collaborator.user.name}</CardTitle>
                    <CardDescription>{collaborator.user.email}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {collaborator.user.image && (
                      <div className="flex justify-center items-center">
                        <img
                          src={collaborator.user.image}
                          alt="profile picture"
                          width="69"
                          height="69"
                          className="rounded-xl"
                        ></img>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
