import './globals.css'

import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import type { AppProps } from 'next/app'
import { trpc } from '@/lib/trpc'
import Nav from '@/components/nav'

type Props = AppProps<{ session: Session }>

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

function App({ Component, pageProps: { session, ...pageProps } }: Props) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className={inter.className}>
          <Nav {...pageProps} />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
