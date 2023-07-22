import { useCallback, useEffect, useRef } from 'react'
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
  }
}

/**
 * Initialize an editor instance and return a ref to it.
 * @param props Editor props.
 * @param ref Ref to the editor container.
 */
export function useEditor(props: EditorProps, ref: React.MutableRefObject<HTMLElement | null>) {
  const editorRef = useRef<EditorJS>()

  /**
   * A reference to the initial props is preserved for initializing the editor.
   */
  const editorConfig = useRef({
    content: props.content,
    tools: props.tools,
  })

  /**
   * Initialize the editor with the initial props.
   */
  const initializeEditor = useCallback(async () => {
    if (!ref?.current) {
      return
    }

    const EditorJS = (await import('@editorjs/editorjs')).default

    editorRef.current ??= new EditorJS({
      holder: ref.current,
      placeholder: 'Type here to write your post...',
      inlineToolbar: true,
      data: editorConfig.current.content,
      tools: await editorConfig.current.tools?.(),
    })
  }, [ref])

  /**
   * Destroy the current editor.
   */
  const destroyEditor = useCallback(() => {
    editorRef.current?.destroy()
    editorRef.current = undefined
  }, [editorRef])

  /**
   * Initialize the editor on mount and destroy it on unmount.
   */
  useEffect(() => {
    destroyEditor()

    initializeEditor()

    return () => {
      destroyEditor()
    }
  }, [ref, initializeEditor, destroyEditor])

  /**
   * If initial content provided to the hook ever changes, re-render the editor.
   */
  useEffect(() => {
    if (editorRef.current && props.content) {
      editorRef.current.render(props.content)
    }
  }, [props.content])

  return editorRef
}
