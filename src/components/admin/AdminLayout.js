import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faUsers, 
  faNewspaper, 
  faCog,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if user is authenticated
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
    }
  }, [router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="admin-layout">
      <AdminHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      <div className="admin-container">
        <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <nav className="sidebar-nav">
            <Link href="/admin/dashboard" className={`nav-item ${router.pathname === '/admin/dashboard' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faHome} />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/team" className={`nav-item ${router.pathname === '/admin/team' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faUsers} />
              <span>Team</span>
            </Link>
            <Link href="/admin/projects" className={`nav-item ${router.pathname === '/admin/projects' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faNewspaper} />
              <span>Projects</span>
            </Link>
            <Link href="/admin/content" className={`nav-item ${router.pathname === '/admin/content' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faChartLine} />
              <span>Content</span>
            </Link>
            <Link href="/admin/settings" className={`nav-item ${router.pathname === '/admin/settings' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faCog} />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        <main className="admin-main">
          {children}
        </main>
      </div>

      <AdminFooter />

      <style jsx>{`
        .admin-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #f8f9fa;
        }

        .admin-container {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .admin-sidebar {
          width: 250px;
          background-color: white;
          border-right: 1px solid #dee2e6;
          transition: width 0.3s ease;
          overflow-y: auto;
          box-shadow: 1px 0 3px rgba(0, 0, 0, 0.05);
        }

        .admin-sidebar.closed {
          width: 0;
        }

        .sidebar-nav {
          padding: 1rem 0;
        }

        :global(.nav-item) {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          color: #495057;
          text-decoration: none;
          transition: all 0.15s ease-in-out;
        }

        :global(.nav-item:hover) {
          background-color: #f8f9fa;
          color: #212529;
        }

        :global(.nav-item.active) {
          background-color: #e9ecef;
          color: #0d6efd;
          font-weight: 500;
        }

        :global(.nav-item svg) {
          width: 1.25rem;
          height: 1.25rem;
        }

        .admin-main {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          background-color: #f8f9fa;
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed;
            top: 60px;
            left: 0;
            bottom: 0;
            z-index: 100;
          }

          .admin-sidebar.closed {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout; 