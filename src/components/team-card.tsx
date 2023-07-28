import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { trpc } from '@/lib/trpc'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DropdownMenuDialogItem,
} from '@/components/ui/dialog'
import { MoreVertical, Trash2, PenBox } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UpdateTeamMembersForm } from './forms/update-team'

type TeamCollaborator = {
  id: string
  name?: string | null
  image?: string | null
}

export interface TeamCardProps {
  id: string
  name: string
  color?: string | null
  description?: string | null

  users?: TeamCollaborator[]
}

export function TeamCard(team: TeamCardProps) {
  const utils = trpc.useContext()

  const updateMutation = trpc.teams.updateTeam.useMutation({
    onSuccess() {
      utils.teams.invalidate()
    },
  })

  const deleteMutation = trpc.teams.deleteTeam.useMutation({
    onSuccess: () => {
      utils.teams.invalidate()
    },
  })

  const handleDelete = () => {
    deleteMutation.mutate(team.id)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-8 max-w-sm">
        <div>
          <CardTitle>{team.name}</CardTitle>
          <CardDescription>{team.description}</CardDescription>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuDialogItem
              triggerChildren={
                <Button variant="ghost">
                  <PenBox className="mr-2 h-4 w-4" />
                  <span>Update Team</span>
                </Button>
              }
            >
              <DialogHeader>
                <DialogTitle>Update Note</DialogTitle>
                <DialogDescription>Edit the initial settings</DialogDescription>
              </DialogHeader>
              <UpdateTeamMembersForm
                initialValue={team.users}
                onSubmit={async (users) => {
                  updateMutation.mutate({
                    teamId: team.id,
                    userIds: users.map((user) => user.id),
                  })
                }}
              />
            </DropdownMenuDialogItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Button
                onClick={handleDelete}
                variant="destructive"
                className="w-full cursor-pointer"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <h2 className="text-xl font-semibold">Members</h2>

        <div className="border my-2" />

        <ul>
          {team.users?.map((user) => (
            <li key={user.id} className="flex items-center gap-2">
              <h3 className="text-sm font-bold">{user.name}</h3>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  )
}
