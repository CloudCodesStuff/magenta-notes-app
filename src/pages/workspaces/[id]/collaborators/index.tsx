import { useRouter } from 'next/router'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BreadCrumbs } from '@/components/bread-crumbs'

export default function Page() {
  const router = useRouter()

  return (
    <div className="p-10">
      <div className="my-2">
        <BreadCrumbs />
      </div>

      <div className="w-full flex">
        <Button onClick={() => router.back()} variant="secondary">
          <ChevronLeft className="mr-2 h-4 w-4" />
          <span>BACK</span>
        </Button>
      </div>
      <h1 className="text-6xl text-center">Workspace Collaborators: TODO</h1>
    </div>
  )
}
