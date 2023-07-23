import { BellRing, Share, Text, Timer } from 'lucide-react'

const Features = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-green-300">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to stay organized
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Never forget a thing with our powerful note-taking app. Stay organized, collaborate
            seamlessly, and enhance your productivity.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-300">
                  <Timer className="w-6 h-6 text-white"></Timer>
                </div>
                Easy Note Creation
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Create notes effortlessly with our intuitive interface. Capture your thoughts,
                ideas, and to-do lists quickly and easily.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-300">
                  <Text className="w-6 h-6 text-white"></Text>
                </div>
                Rich Text Formatting
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Customize your notes with rich text formatting options. Add headings, bold and
                italic text, bullet points, and more to make your notes visually appealing.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-300">
                  <BellRing className="w-6 h-6 text-white"></BellRing>
                </div>
                Reminders and Notifications
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Set reminders for important notes and receive notifications to stay on top of your
                tasks and deadlines.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-300">
                  <Share className="w-6 h-6 text-white"></Share>
                </div>
                Collaboration and Sharing
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Collaborate with others by sharing notes. Work together in real-time, make edits,
                and keep everyone on the same page.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Features
