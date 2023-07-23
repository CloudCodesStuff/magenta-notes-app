import { z } from 'zod'

const env = z
  .object({
    GITHUB_ID: z.string(),
    GITHUB_SECRET: z.string(),
    GOOGLE_ID: z.string(),
    GOOGLE_SECRET: z.string(),
  })
  .parse({ ...process.env })

export default env
