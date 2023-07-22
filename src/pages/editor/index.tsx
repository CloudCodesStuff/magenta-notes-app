import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import TextareaAutosize from 'react-textarea-autosize'
import { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEditor } from '@/components/editor'

const postPatchSchema = z.object({
  title: z.string(),
})

type FormData = z.infer<typeof postPatchSchema>

export default function Page() {
  const [text, setText] = useState('hi')

  const props = useMemo(() => {
    return {
      content: {
        blocks: [
          {
            type: 'paragraph',
            data: {
              text,
            },
          },
        ],
      },
    }
  }, [text])

  const ref = useRef<HTMLDivElement | null>(null)

  const editorRef = useEditor(props, ref)

  editorRef

  const { register } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  })

  const post = {
    title: 'Hello, World',
    published: false,
  }

  return (
    <>
      <textarea
        className="border h-12 w-12"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
        <TextareaAutosize
          autoFocus
          id="title"
          defaultValue={post.title}
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          {...register('title')}
        />

        <div ref={ref} className="min-h-[500px]" />

        <p className="text-sm text-gray-500">
          Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open
          the command menu.
        </p>
      </div>
    </>
  )
}
