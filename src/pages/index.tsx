import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className="p-2">
      <h1 className="text-center">Buttons</h1>
      <div className="w-full p-2 flex flex-wrap gap-4 justify-center items-center border border-primary-500 rounded">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="error">Destructive</Button>
      </div>
    </div>
  )
}
