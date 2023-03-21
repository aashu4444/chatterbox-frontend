import '@/styles/globals.scss';
import { ThemeProvider } from "next-themes";
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AppContext, AppWrapper } from '@/AppContext';


export default function App({ Component, pageProps }) {
  const router = useRouter();


  useEffect(() => {
    // router.events.on('routeChangeStart', (url, { shallow }) => {
    //   barRef.current.continuousStart();
    // });
    // console.log(AppContext)

  }, [router]);

  return (
    <AppWrapper>
      <ThemeProvider enableSystem={true} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AppWrapper>
  );
}
