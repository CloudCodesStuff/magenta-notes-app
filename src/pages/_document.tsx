import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-surface-50 dark:bg-surface-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
