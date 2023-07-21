import './globals.css'

import type { AppProps } from 'next/app'
import { trpc } from '@/lib/trpc'
import { SessionProvider } from 'next-auth/react'
import Nav from '@/components/nav'

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Nav />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
