import { z } from 'zod'

export const addTeamCollaboratorsSchema = z.object({
  teamId: z.string(),
  users: z.string().array().or(z.string()).default([]),
})

export type AddTeamCollaboratorsInput = z.infer<typeof addTeamCollaboratorsSchema>
