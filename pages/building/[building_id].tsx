import Head from 'next/head';
import React from 'react';
import useTranslation from '../../hooks/translation/useTranslation';
import { useRouter } from 'next/router';
import BuildingPage from '../../components/pages/projectPage/components/BuildingPage';

export default function AboutMeView() {
  const { getTitle } = useTranslation();
  const { building_id } = useRouter().query;

  return (
    <>
      <Head>
        <title>{getTitle('BUILDINGPAGE')}</title>
      </Head>
      <BuildingPage buildingId={building_id as string} />
    </>
  );
}
