import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <Link href="/admin" className={`admin-nav-item ${currentPath === '/admin' ? 'active' : ''}`}>
            Dashboard
          </Link>
          <Link href="/admin/team" className={`admin-nav-item ${currentPath === '/admin/team' ? 'active' : ''}`}>
            Team
          </Link>
          <Link href="/admin/projects" className={`admin-nav-item ${currentPath === '/admin/projects' ? 'active' : ''}`}>
            Projects
          </Link>
          <Link href="/admin/content" className={`admin-nav-item ${currentPath === '/admin/content' ? 'active' : ''}`}>
            Content
          </Link>
        </nav>
      </div>
      <div className="admin-content">
        {children}
      </div>
      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
        }
        .admin-sidebar {
          width: 250px;
          background-color: #1a1a2e;
          color: white;
          padding: 20px;
        }
        .admin-logo {
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 20px;
        }
        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .admin-nav-item {
          padding: 10px 15px;
          border-radius: 5px;
          color: white;
          text-decoration: none;
          transition: background-color 0.3s;
        }
        .admin-nav-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .admin-nav-item.active {
          background-color: #4a4af4;
        }
        .admin-content {
          flex: 1;
          padding: 20px;
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

export default AdminLayout; 