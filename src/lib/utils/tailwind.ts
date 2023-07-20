import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges TailwindCSS classes.
 */
export const cn: typeof clsx = (...inputs) => {
  return twMerge(clsx(inputs))
}
