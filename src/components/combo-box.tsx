import { useState } from 'react'
import { Combobox } from '@headlessui/react'

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const multiple: any = true

export function ComboboxInput() {
  const [selectedPeople, setSelectedPeople] = useState([people[0], people[1]])

  return (
    <Combobox value={selectedPeople} onChange={setSelectedPeople} multiple={multiple} as="div">
      {selectedPeople.length > 0 && (
        <ul>
          {selectedPeople.map((person) => (
            <li key={person.id}>{person.name}</li>
          ))}
        </ul>
      )}
      <Combobox.Input />
      <Combobox.Options>
        {people.map((person) => (
          <Combobox.Option key={person.id} value={person}>
            {person.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}
