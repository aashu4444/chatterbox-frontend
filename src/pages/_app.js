import '@/styles/globals.scss';
import '@/styles/utils.scss';
import { ThemeProvider } from "next-themes";
import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AppContext, AppWrapper } from '@/AppContext';
import Modal from '@/components/Modal';
import InfoModal from '@/components/InfoModal';
import Script from 'next/script';
import axios from 'axios';
import http from 'http';

const agent = new http.Agent({
  rejectUnauthorized: false,
})

axios.defaults.httpAgent = agent;

export default function App({ Component, pageProps }) {

  return (
    <AppWrapper>
      <ThemeProvider enableSystem={true} attribute="class">
        <InfoModal />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppWrapper>
  );
}
