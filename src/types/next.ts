import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppPropsWithLayout<T = any> = AppProps<T> & {
  Component: NextPageWithLayout
}
