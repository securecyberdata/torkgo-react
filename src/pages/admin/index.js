import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminHead from '@/components/admin/AdminHead';

const AdminIndex = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page
    router.push('/admin/login');
  }, [router]);

  return (
    <div className="admin-redirect">
      <AdminHead title="Admin | Torkgo" description="Admin panel for Torkgo" />
      <p>Redirecting to admin login...</p>
      
      <style jsx>{`
        .admin-redirect {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f5f5;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .admin-redirect p {
          color: #666;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
};

export default AdminIndex; 