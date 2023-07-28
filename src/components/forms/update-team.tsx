import { forwardRef, useCallback, useMemo, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { Badge } from '@/components/ui/badge'
import { RouterOutput, trpc } from '@/lib/trpc'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const multiple: any = true

export type User = NonNullable<NonNullable<RouterOutput['teams']['getTeamById']>['users']>[number]

interface Props {
  initialValue?: User[]
  teamId: string
  onChange?: (users: User[]) => unknown
}

/**
 * Sets the members working on this team.
 */
export const UpdateTeamMembersForm = forwardRef<HTMLElement, Props>((props: Props, ref) => {
  const [selectedUsers, setSelectedTags] = useState<User[]>(props.initialValue ?? [])

  const [input, setInput] = useState('')

  const query = trpc.users.searchUserByName.useQuery(input)

  const unselectedUsers = useMemo(() => {
    const selectedTagNames = selectedUsers.map((tag) => tag.name)

    return query.data?.filter((user) =>
      input
        ? user.name?.toLowerCase().includes(input.toLowerCase()) &&
          !selectedTagNames.includes(user.name)
        : !selectedTagNames.includes(user.name),
    )
  }, [query.data, selectedUsers, input, props.initialValue])

  const handleUnselect = useCallback(
    (tag: User) => {
      setSelectedTags((currentSelectedTags) => {
        const newSelectedTags = currentSelectedTags.filter((p) => p.name !== tag.name)
        props.onChange?.(newSelectedTags)
        return newSelectedTags
      })
    },
    [setSelectedTags],
  )

  const handleChange = useCallback(
    (tags: User[]) => {
      setSelectedTags(tags)
      props.onChange?.(tags)
    },
    [setSelectedTags],
  )

  return (
    <div>
      <Combobox
        value={selectedUsers}
        onChange={handleChange}
        multiple={multiple}
        as="div"
        name="tags"
        ref={ref}
      >
        {selectedUsers.length > 0 && (
          <ul className="m-2 p-2 flex gap-2">
            {selectedUsers.map((person, index) => (
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
          {unselectedUsers?.map((tag) => (
            <Combobox.Option
              key={tag.id}
              value={tag}
              className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent"
            >
              {tag.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  )
})

UpdateTeamMembersForm.displayName = 'UpdateTeamMembersForm'
