import { type } from 'arktype'

const env = type({
  GITHUB_ID: 'string',
  GITHUB_SECRET: 'string',
}).assert({ ...process.env })

export default env
