import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className=''>
      <Head />
      <body className='dark:text-white dark:bg-gray-900 h-full'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
