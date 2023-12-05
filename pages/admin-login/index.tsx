import Head from 'next/head';
import React from 'react';
import AdminLogin from '../../components/pages/admin/components/AdminLogin';

export default function HomeIndex() {

  return (
    <>
      <Head>
        <title>{'Admin Login'}</title>
      </Head>
      <AdminLogin />
    </>
  );
}
