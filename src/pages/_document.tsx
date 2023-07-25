import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-surface-100-800-token">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
