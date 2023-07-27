import '@/styles/globals.css'
import '@/styles/editor.css'

import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { SessionProvider } from 'next-auth/react'
import type { Session } from 'next-auth'
import { trpc } from '@/lib/trpc'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { Toaster } from '@/components/ui/toaster'
import type { AppPropsWithLayout } from '@/types/next'

type Props = AppPropsWithLayout<{ session: Session }>

const inter = Inter({
  subsets: ['latin'],
})

function App({ Component, pageProps: { session, ...pageProps } }: Props) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className={inter.className}>
          <Nav />
          <main className="min-h-screen">{getLayout(<Component {...pageProps} />)}</main>
          <Footer />
        </div>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default trpc.withTRPC(App)
