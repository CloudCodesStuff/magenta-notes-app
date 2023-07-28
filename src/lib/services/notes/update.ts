import { db } from '@/lib/db'
import { UpdateNoteInput } from '@/lib/schemas/update-note'
import type { Tag } from '@/components/tag-combo-box'

export interface updateNoteUserData extends UpdateNoteInput {
  id: string
}

interface ExistingTag extends Tag {
  id: string
}

export async function updateNote(updatedData: updateNoteUserData, userId: string) {
  const { tags, ...data } = updatedData

  const updatedNote = await db.note.update({
    where: { id: data.id },
    data,
    include: {
      NoteTags: {
        include: {
          tag: true,
        },
      },
    },
  })

  if (tags?.length) {
    const newTags = tags.filter((tag) => tag.id == null)
    const existingTags = tags.filter((tag): tag is ExistingTag => tag.id != null)

    const createdTags = await db.$transaction(
      newTags.map((tag) => db.tag.create({ data: { userId, name: tag.name } })),
    )

    const tagsToConnect = [...createdTags, ...existingTags]

    const tagNamesToConnect = tagsToConnect.map((tag) => tag.name)

    const tagsToDelete = updatedNote.NoteTags.filter((noteTag) => {
      return !tagNamesToConnect.includes(noteTag.tag.name)
    })

    await db.$transaction(
      tagsToConnect.map((tag) =>
        db.noteTags.upsert({
          where: {
            noteId_tagId: {
              tagId: tag.id,
              noteId: updatedNote.id,
            },
          },
          create: {
            noteId: updatedNote.id,
            tagId: tag.id,
          },
          update: {
            noteId: updatedNote.id,
            tagId: tag.id,
          },
        }),
      ),
    )

    await db.$transaction(
      tagsToDelete.map((tag) =>
        db.noteTags.delete({
          where: {
            noteId_tagId: {
              noteId: updatedNote.id,
              tagId: tag.tagId,
            },
          },
        }),
      ),
    )
  }

  return updatedNote
}
