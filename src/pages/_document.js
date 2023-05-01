import { Html, Head, Main, NextScript } from 'next/document'
import { useContext } from 'react';

export default function Document() {
  return (
    <Html lang="en" className=''>
      <Head />
      <body className='dark:text-white text-black dark:bg-gray-900 h-full'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
