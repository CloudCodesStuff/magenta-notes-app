import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(_opts: CreateNextContextOptions)  {
  return {}
}

export type Context = inferAsyncReturnType<typeof createContext>;

