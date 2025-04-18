import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const EditProject = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Redirect to the main projects page
    router.push('/admin/projects');
  }, [router, id]);

  return (
    <>
      <Head>
        <title>Edit Project - Admin Dashboard</title>
      </Head>
      <div className="loading-container">
        <p>Redirecting to projects page...</p>
      </div>
      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 1.2rem;
        }
      `}</style>
    </>
  );
};

export default EditProject; 