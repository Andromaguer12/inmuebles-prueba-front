import Head from 'next/head';
import React from 'react';
import Home from '../components/pages/home/components/Home';
import useTranslation from '../hooks/translation/useTranslation';

export default function HomeIndex() {
  const { getTitle } = useTranslation();

  return (
    <>
      <Head>
        <link rel="icon" href="/icoDotDev.ico" />
        <title>{getTitle('HOME')}</title>
      </Head>
      <Home />
    </>
  );
}
