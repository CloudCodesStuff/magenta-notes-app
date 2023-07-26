import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from './ui/button'

export interface BreadCrumbLink {
  href: string
  label: string
}

export function BreadCrumbs() {
  const router = useRouter()

  const paths = useMemo(() => {
    return router.asPath
      .split('/')
      .slice(1)
      .reduce((links, current, index, array) => {
        links.push({
          href: `/${array.slice(0, index + 1).join('/')}`,
          label: current,
        })
        return links
      }, [] as BreadCrumbLink[])
  }, [router.route])

  return (
    <div className="flex items-center gap-2">
      {paths.map((path) => (
        <div key={path.href}>
          <Button asChild variant="ghost" size="sm">
            <Link href={path.href}>{path.label}</Link>
          </Button>
          <span className="mx-2">/</span>
        </div>
      ))}
    </div>
  )
}
