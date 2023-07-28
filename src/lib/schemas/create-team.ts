import { z } from 'zod'

export const createTeamSchema = z.object({
  name: z.string().min(2, { message: 'Team name must be at least 2 characters long' }),

  description: z
    .string()
    .nullish()
    .transform((val) => val || undefined),
})

export type CreateTeamInput = z.infer<typeof createTeamSchema>
