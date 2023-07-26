import { useCallback, useEffect, useRef, useState } from 'react'
import type EditorJS from '@editorjs/editorjs'

export interface EditorProps {
  content?: EditorJS.OutputData
  tools?: () => Promise<EditorJS.ToolConfig> | EditorJS.ToolConfig
}

export async function defaultTools() {
  const Header = (await import('@editorjs/header')).default
  const Embed = (await import('@editorjs/embed')).default
  const Table = (await import('@editorjs/table')).default
  const List = (await import('@editorjs/list')).default
  const Code = (await import('@editorjs/code')).default
  const LinkTool = (await import('@editorjs/link')).default
  const InlineCode = (await import('@editorjs/inline-code')).default

  return {
    header: Header,
    linkTool: LinkTool,
    list: List,
    code: Code,
    inlineCode: InlineCode,
    table: Table,
    embed: Embed,
  } satisfies Record<string, EditorJS.ToolConstructable | EditorJS.ToolSettings>
}

/**
 * Initialize an editor instance and return a ref to it.
 * @param props Editor props.
 * @param ref Ref to the editor container.
 */
export function useEditor(props: EditorProps = {}) {
  const ref = useRef<EditorJS>()
  const [mounted, setMounted] = useState(false)

  /**
   * Initialize the editor with the initial props.
   */
  const setRef = useCallback(
    async (holder: HTMLElement | null) => {
      if (!holder) {
        return
      }

      const EditorJS = (await import('@editorjs/editorjs')).default

      ref.current = new EditorJS({
        holder,
        onReady() {
          setMounted(true)
        },
        inlineToolbar: true,
        placeholder: 'Type here to write your post...',
        data: props.content,
        tools: await (props.tools ?? defaultTools)(),
      })
    },
    [ref, props.content, props.tools, setMounted],
  )

  useEffect(() => {
    return () => {
      if (typeof ref.current?.destroy === 'function') {
        ref.current.destroy()
      }
      ref.current = undefined
    }
  }, [])

  return [ref, setRef, mounted] as const
}
