import transformer from 'superjson'
import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { AppRouter } from '@/server/routers'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

function getBaseUrl() {
  // Browser should use relative path.
  if (typeof window !== 'undefined') {
    return ''
  }

  // Deployed on Vercel.
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Assume localhost otherwise.
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      transformer,
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,

          // You can pass any HTTP headers you wish here
          async headers() {
            if (!opts.ctx?.req?.headers) {
              return {}
            }
            // To use SSR properly, you need to forward client headers to the server
            // This is so you can pass through things like cookies when we're server-side rendering
            return {
              cookie: opts.ctx.req.headers.cookie,
            }
          },
        }),
      ],
    }
  },

  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: true,
})

export type RouterOutput = inferRouterOutputs<AppRouter>

export type RouterInput = inferRouterInputs<AppRouter>
