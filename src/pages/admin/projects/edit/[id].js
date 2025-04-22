import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHead from '@/components/admin/AdminHead';

const EditProject = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Redirect to the main projects page
    router.push('/admin/projects');
  }, [router, id]);

  if (!isClient) {
    return null;
  }

  return (
    <AdminLayout>
      <AdminHead title="Edit Project" description="Edit an existing project" />
      <div className="admin-content">
        <div className="loading-container">
          <p>Redirecting to projects page...</p>
        </div>
      </div>
      <style jsx>{`
        .admin-content {
          padding: 2rem;
        }
        
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50vh;
          font-size: 1.2rem;
          color: #666;
        }
      `}</style>
    </AdminLayout>
  );
};

export default EditProject; 