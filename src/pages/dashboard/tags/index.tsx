import type { NextPageWithLayout } from '@/types/next'
import Layout from '../layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { trpc } from '@/lib/trpc'
import fontColorContrast from 'font-color-contrast'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical, Trash2, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CreateTagForm } from '@/components/forms/create-tag'

const Page: NextPageWithLayout = () => {
  const query = trpc.tags.getAll.useQuery()

  const utils = trpc.useContext()

  const deleteMutation = trpc.tags.delete.useMutation()

  const handleDelete = (id: string) => {
    return () => {
      deleteMutation.mutate(id, {
        onSuccess() {
          utils.tags.invalidate()
          utils.notes.invalidate()
        },
      })
    }
  }

  return (
    <Card className="col-span-2 h-fit">
      <CardHeader>
        <div className="flex w-full justify-between">
          <div>
            <CardTitle className="text-5xl font-bold">Tags</CardTitle>
            <CardDescription>Tags assigned to your notes</CardDescription>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4"></Plus>
                New Tag
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Tag</DialogTitle>
                <DialogDescription>Create a tag for notes</DialogDescription>
              </DialogHeader>
              <CreateTagForm />
            </DialogContent>
          </Dialog>
        </div>

        <div className="border" />
      </CardHeader>

      <CardContent>
        {query.data?.length ? (
          <div className="flex flex-row flex-wrap gap-4">
            {query.data.map((tag) => {
              const color = tag.color || 'gray'
              const contrastColor = fontColorContrast(color)
              const hover = contrastColor === '#000000' ? 'hover:bg-muted' : 'hover:bg-slate-500'

              return (
                <Card
                  key={tag.id}
                  style={{
                    backgroundColor: color,
                    borderColor: contrastColor,
                    color: contrastColor,
                  }}
                >
                  <CardHeader className="flex flex-row gap-2 items-center justify-between">
                    <CardTitle className="truncate py-2">{tag.name}</CardTitle>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={`p-2 flex items-center justify-center rounded-md border ${hover}`}
                        style={{ borderColor: contrastColor }}
                      >
                        <div>
                          <MoreVertical className="h-4 w-4" />
                        </div>
                        <span className="sr-only">Open</span>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Button
                            onClick={handleDelete(tag.id)}
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
                </Card>
              )
            })}
          </div>
        ) : (
          <div>No tags found</div>
        )}
      </CardContent>
    </Card>
  )
}

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Page
