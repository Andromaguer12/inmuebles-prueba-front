import Head from 'next/head';
import React from 'react';
import Home from '../components/pages/home/components/Home';
import useTranslation from '../hooks/translation/useTranslation';

export default function HomeIndex() {
  const { getTitle } = useTranslation();

  return (
    <>
      <Head>
        <title>{getTitle('HOME')}</title>
      </Head>
      <Home />
    </>
  );
}
