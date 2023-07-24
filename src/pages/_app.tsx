import '@/styles/globals.css'
import '@/styles/editor.css'

import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import type { AppProps } from 'next/app'
import { trpc } from '@/lib/trpc'
import Nav from '@/components/nav'
import { Toaster } from '@/components/ui/toaster'

type Props = AppProps<{ session: Session }>

const inter = Inter({
  subsets: ['latin'],
})

function App({ Component, pageProps: { session, ...pageProps } }: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className={inter.className}>
          <Nav {...pageProps} />
          <Component {...pageProps} />
        </div>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
