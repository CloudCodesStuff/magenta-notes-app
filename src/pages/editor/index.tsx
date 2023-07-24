import { useRef } from 'react'
import { useEditor } from '@/components/use-editor'

export default function Page() {
  const ref = useRef<HTMLDivElement | null>(null)

  const editorRef = useEditor(
    {
      content: {
        blocks: [
          {
            type: 'paragraph',
            data: {
              text: 'Hello World!',
            },
          },
        ],
      },
    },
    ref,
  )

  // so eslint doesn't complain for now.
  editorRef

  return (
    <div className="flex w-full items-center justify-between">
      <div className="prose prose-stone dark:prose-invert mx-auto w-[800px]">
        <div ref={ref} className="min-h-[500px]" />

        <p className="text-sm text-gray-500">
          Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open
          the command menu.
        </p>
      </div>
    </div>
  )
}
