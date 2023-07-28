import { forwardRef, useCallback, useMemo, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { Badge } from './ui/badge'
import { RouterOutput, trpc } from '@/lib/trpc'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const multiple: any = true

export type Tag = RouterOutput['tags']['getAll'][number]

interface Props {
  initialValue?: Tag[]
  onChange?: (tags: Tag[]) => unknown
}

/**
 * Adds tags.
 */
export const TagComboboxInput = forwardRef<HTMLElement, Props>((props: Props = {}, ref) => {
  const query = trpc.tags.getAll.useQuery()
  const [selectedTags, setSelectedTags] = useState<Tag[]>(props.initialValue ?? [])
  const [input, setInput] = useState('')

  const unselectedTags = useMemo(() => {
    const selectedTagNames = selectedTags.map((tag) => tag.name)
    return query.data?.filter((tag) =>
      input
        ? tag.name.toLowerCase().includes(input.toLowerCase()) &&
          !selectedTagNames.includes(tag.name)
        : !selectedTagNames.includes(tag.name),
    )
  }, [query.data, selectedTags, input, props.initialValue])

  const handleUnselect = useCallback(
    (tag: Tag) => {
      setSelectedTags((currentSelectedTags) => {
        const newSelectedTags = currentSelectedTags.filter((p) => p.name !== tag.name)
        props.onChange?.(newSelectedTags)
        return newSelectedTags
      })
    },
    [setSelectedTags],
  )

  const handleChange = useCallback(
    (tags: Tag[]) => {
      setSelectedTags(tags)
      props.onChange?.(tags)
    },
    [setSelectedTags],
  )

  return (
    <div>
      <Combobox
        value={selectedTags}
        onChange={handleChange}
        multiple={multiple}
        as="div"
        name="tags"
        ref={ref}
      >
        {selectedTags.length > 0 && (
          <ul className="m-2 p-2 flex gap-2">
            {selectedTags.map((person, index) => (
              <li key={person.id ?? index}>
                <Badge onClick={() => handleUnselect(person)}>{person.name}</Badge>
              </li>
            ))}
          </ul>
        )}

        {/* https://github.com/tailwindlabs/headlessui/discussions/1236#discussioncomment-2970969 */}
        <Combobox.Button as="div">
          <Combobox.Input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(event) => setInput(event.target.value)}
          />
        </Combobox.Button>

        <Combobox.Options className="flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground">
          {unselectedTags?.map((tag) => (
            <Combobox.Option
              key={tag.id}
              value={tag}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent"
            >
              {tag.name}
            </Combobox.Option>
          ))}

          {input.length > 0 && (
            <Combobox.Option
              value={{ id: null, name: input }}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent"
            >
              Create &#34;{input}&#34;
            </Combobox.Option>
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  )
})

TagComboboxInput.displayName = 'TagComboboxInput'
