import React from 'react';
import AllProjectsPage from '../../components/pages/allProjectsPage/components/AllProjectsPage';
import Head from 'next/head';
import useTranslation from '../../hooks/translation/useTranslation';

export default function AboutMeView() {
  const { getTitle } = useTranslation();

  return <>
    <Head>
      <title>{getTitle('ALLPROJECTS')}</title>
    </Head>
    <AllProjectsPage />
  </>
}
