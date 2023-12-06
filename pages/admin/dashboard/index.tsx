import Head from 'next/head'
import React from 'react'
import AdminPanel from '../../../components/pages/admin/components/AdminPanel'

const AdminDashboard = () => {
  return (
    <>
      <Head>
        <title>{'Admin Dashboard'}</title>
      </Head>
      <AdminPanel />
    </>
  )
}

export default AdminDashboard