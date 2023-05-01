import '@/styles/globals.scss';
import '@/styles/utils.scss';
import { ThemeProvider } from "next-themes";
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AppContext, AppWrapper } from '@/AppContext';
import Modal from '@/components/Modal';
import InfoModal from '@/components/InfoModal';


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
        <InfoModal />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppWrapper>
  );
}
