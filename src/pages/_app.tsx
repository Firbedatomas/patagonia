import '@/styles/globals.css'
import '../../src/styles/PhoneFrameStyles.css';
import '../../src/styles/MenuPreviewStyles.css';

import React from 'react';
import type { AppProps } from 'next/app';
import Navbar from '@/../components/Navbar'; // Asegúrate de importar tu componente Navbar desde la ubicación correcta
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Patagonia</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      </SessionProvider>
  );
}

export default MyApp;
