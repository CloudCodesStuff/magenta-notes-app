import Link from 'next/link'
import { BellRing, Share, Text, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSession, signIn } from 'next-auth/react'

const features = [
  {
    name: 'Powerful Organization',
    icon: Timer,
    description:
      'Create workspaces and organize notes effortlessly with our intuitive interface. Keep track of your tasks and deadlines with ease.',
  },
  {
    name: 'Advanced Text Formatting',
    icon: Text,
    description:
      'Elegantly capture your ideas in simple, flexible blocks. Leverage the power of block-based note-taking to make your notes visually appealing.',
  },
  {
    name: 'Project Management',
    icon: BellRing,
    description:
      'Easily delegate tasks to team members. Personalize your dashboard and workspaces to suit your needs.',
  },
  {
    name: 'Collaboration and Sharing',
    icon: Share,
    description:
      'Collaborate with others by sharing workspaces and notes. Share feedback and ideas in real time.',
  },
]

export default function Page() {
  const { data: session } = useSession()

  return (
    <div>
      <div className="flex p-16 flex-col justify-center text-center items-center ">
        <div>
          <h1 className="mb-10 p-2 text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
            A better note taking app.
          </h1>
        </div>
        <h2 className="text-2xl mb-10">
          Stop forgetting and start organizing. Plan projects with sticky notes.
        </h2>
        <div className="flex gap-3">
          {session ? (
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          ) : (
            <Button size="lg" onClick={() => signIn()}>
              Get Started
            </Button>
          )}
          <Button size="lg" variant="secondary" asChild>
            <Link href="/#features">Features</Link>
          </Button>
        </div>
      </div>

      <div className="my-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 id="features" className="text-5xl font-bold">
              Features
            </h2>
            <p className="mt-2 text-2xl font-semibold">Everything you need to stay organized</p>
            <p className="mt-6 text-lg leading-8">
              Never forget a thing with our powerful note-taking app. Stay organized, collaborate
              seamlessly, and enhance your productivity.
            </p>
          </div>
          <div className="mx-auto mt-20 max-w-xl lg:max-w-4xl">
            <dl className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 leading-7">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
