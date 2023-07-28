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
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface TeamCardProps {
  id: string
  name: string
  color?: string | null
  description?: string | null
}

export function TeamCard(props: TeamCardProps) {
  const utils = trpc.useContext()

  const deleteMutation = trpc.teams.deleteTeam.useMutation()

  const handleDelete = () => {
    deleteMutation.mutate(props.id, {
      onSuccess: () => {
        utils.teams.invalidate()
      },
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-8 max-w-sm">
        <div>
          <CardTitle>{props.name}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
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

      <CardContent></CardContent>

      <CardFooter></CardFooter>
    </Card>
  )
}
