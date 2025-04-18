import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUsers, 
  faProjectDiagram, 
  faNewspaper, 
  faCog, 
  faSignOutAlt,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-layout">
      <Head>
        <title>Admin Dashboard | Torkgo</title>
        <meta name="description" content="Admin dashboard for Torkgo" />
      </Head>

      <AdminHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <div className="admin-container">
        {/* Admin Sidebar */}
        <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <nav className="admin-nav">
            <ul>
              <li className={router.pathname === '/admin/dashboard' ? 'active' : ''}>
                <Link href="/admin/dashboard">
                  <FontAwesomeIcon icon={faHome} /> Dashboard
                </Link>
              </li>
              <li className={router.pathname === '/admin/team' ? 'active' : ''}>
                <Link href="/admin/team">
                  <FontAwesomeIcon icon={faUsers} /> Team
                </Link>
              </li>
              <li className={router.pathname === '/admin/projects' ? 'active' : ''}>
                <Link href="/admin/projects">
                  <FontAwesomeIcon icon={faProjectDiagram} /> Projects
                </Link>
              </li>
              <li className={router.pathname === '/admin/content' ? 'active' : ''}>
                <Link href="/admin/content">
                  <FontAwesomeIcon icon={faNewspaper} /> Content
                </Link>
              </li>
              <li className={router.pathname === '/admin/settings' ? 'active' : ''}>
                <Link href="/admin/settings">
                  <FontAwesomeIcon icon={faCog} /> Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Admin Main Content */}
        <main className="admin-main">
          {children}
        </main>
      </div>

      <AdminFooter />

      <style jsx>{`
        .admin-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f5f5f5;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .admin-container {
          display: flex;
          flex: 1;
        }

        .admin-sidebar {
          width: 250px;
          background-color: #2d2d2d;
          color: #e0e0e0;
          transition: all 0.3s ease;
          height: calc(100vh - 60px);
          position: sticky;
          top: 60px;
          overflow-y: auto;
        }

        .admin-sidebar.closed {
          width: 0;
          overflow: hidden;
        }

        .admin-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .admin-nav li {
          margin: 0;
          padding: 0;
        }

        .admin-nav a {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          color: #e0e0e0;
          text-decoration: none;
          transition: all 0.2s ease;
          gap: 0.75rem;
        }

        .admin-nav a:hover {
          background-color: #3d3d3d;
        }

        .admin-nav li.active a {
          background-color: #4a9eff;
          color: white;
        }

        .admin-main {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            position: fixed;
            z-index: 99;
            height: 100vh;
            top: 60px;
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