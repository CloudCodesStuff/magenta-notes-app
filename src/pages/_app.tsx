import './globals.css'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import type { AppProps } from 'next/app'
import { trpc } from '@/lib/trpc'
import Nav from '@/components/nav'

type Props = AppProps<{ session: Session }>

function App({ Component, pageProps: { session, ...pageProps } }: Props) {
  return (
    <SessionProvider session={session}>
      <Nav {...pageProps} />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
