import { forwardRef, useCallback, useMemo, useState, ChangeEvent, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import { Badge } from '@/components/ui/badge'
import { trpc } from '@/lib/trpc'
import { Button } from '@/components/ui/button'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const multiple: any = true

export type User = {
  id: string
  name?: string | null
  image?: string | null
}

interface Props {
  initialValue?: User[]
  teamId: string
  onChange?: (users: User[]) => unknown
  onSubmit?: (users: User[]) => unknown
}

let activeDebounce: ReturnType<typeof setTimeout> | undefined = undefined

let latestInput: string = ''

const debounceDuration = 500

/**
 * Sets the members working on this team.
 */
export const UpdateTeamMembersForm = forwardRef<HTMLElement, Props>((props: Props, ref) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>(props.initialValue ?? [])

  const [input, setInput] = useState('')

  /**
   * All users on website.
   */
  const [users, setUsers] = useState<User[]>([])

  const utils = trpc.useContext()

  /**
   * Once on mount, initialize the users to autocomplete.
   */
  useEffect(() => {
    utils.users.searchUserByName.fetch('').then((users) => setUsers(users))
  }, [utils, setUsers])

  const handleInput = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value)

      latestInput = event.target.value

      if (activeDebounce != null) {
        return
      } else {
        activeDebounce = setTimeout(async () => {
          activeDebounce = undefined
          setUsers(await utils.users.searchUserByName.fetch(latestInput))
        }, debounceDuration)
      }
    },
    [setInput, setUsers],
  )

  const unselectedUsers = useMemo(() => {
    const selectedTagNames = selectedUsers.map((tag) => tag.name)

    return users.filter((user) =>
      input
        ? user.name?.toLowerCase().includes(input.toLowerCase()) &&
          !selectedTagNames.includes(user.name)
        : !selectedTagNames.includes(user.name),
    )
  }, [users, selectedUsers, input, props.initialValue])

  const handleUnselect = useCallback(
    (tag: User) => {
      setSelectedUsers((currentSelectedTags) => {
        const newSelectedTags = currentSelectedTags.filter((p) => p.name !== tag.name)
        props.onChange?.(newSelectedTags)
        return newSelectedTags
      })
    },
    [setSelectedUsers],
  )

  const handleChange = useCallback(
    (users: User[]) => {
      setSelectedUsers(users)
      props.onChange?.(users)
    },
    [setSelectedUsers, props.onChange],
  )

  const handleSubmit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault()
      props.onSubmit?.(selectedUsers)
    },
    [props.onSubmit, selectedUsers],
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
          <ul className="my-2 flex gap-2">
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
            onChange={handleInput}
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
      <Button onClick={handleSubmit} type="button" className="my-4">
        Submit
      </Button>
    </div>
  )
})

UpdateTeamMembersForm.displayName = 'UpdateTeamMembersForm'
