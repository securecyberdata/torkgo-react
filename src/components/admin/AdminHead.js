import React from 'react';
import Head from 'next/head';

const AdminHead = ({ title, description }) => {
  return (
    <Head>
      <title>{title ? `${title} | Admin Panel` : 'Admin Panel'}</title>
      <meta name="description" content={description || 'Admin panel for managing website content'} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="noindex, nofollow" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    </Head>
  );
};

export default AdminHead; 