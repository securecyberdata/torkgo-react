import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSignOutAlt, 
  faUser, 
  faBell, 
  faCog,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const AdminHeader = ({ toggleSidebar, isSidebarOpen }) => {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </button>
        <div className="admin-logo">
          <Link href="/admin/dashboard">
            <span className="admin-logo-text">Torkgo Admin</span>
          </Link>
        </div>
      </div>

      <div className="admin-header-right">
        <div className="admin-notifications">
          <button 
            className="notification-button"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FontAwesomeIcon icon={faBell} />
            <span className="notification-badge">3</span>
          </button>
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifications</h3>
                <button className="mark-all-read">Mark all as read</button>
              </div>
              <div className="notification-list">
                <div className="notification-item unread">
                  <div className="notification-icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="notification-content">
                    <p className="notification-text">New team member added</p>
                    <p className="notification-time">2 hours ago</p>
                  </div>
                </div>
                <div className="notification-item unread">
                  <div className="notification-icon">
                    <FontAwesomeIcon icon={faCog} />
                  </div>
                  <div className="notification-content">
                    <p className="notification-text">System update available</p>
                    <p className="notification-time">5 hours ago</p>
                  </div>
                </div>
                <div className="notification-item">
                  <div className="notification-icon">
                    <FontAwesomeIcon icon={faBell} />
                  </div>
                  <div className="notification-content">
                    <p className="notification-text">Backup completed successfully</p>
                    <p className="notification-time">Yesterday</p>
                  </div>
                </div>
              </div>
              <div className="notification-footer">
                <Link href="/admin/notifications">View all notifications</Link>
              </div>
            </div>
          )}
        </div>

        <div className="admin-user-menu">
          <button 
            className="user-menu-button"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">A</div>
            <span className="user-name">Admin</span>
          </button>
          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-info">
                <div className="user-avatar-large">A</div>
                <div className="user-details">
                  <p className="user-name-large">Admin User</p>
                  <p className="user-email">admin@torkgo.com</p>
                </div>
              </div>
              <div className="user-menu-items">
                <Link href="/admin/profile" className="user-menu-item">
                  <FontAwesomeIcon icon={faUser} /> Profile
                </Link>
                <Link href="/admin/settings" className="user-menu-item">
                  <FontAwesomeIcon icon={faCog} /> Settings
                </Link>
                <button className="user-menu-item logout" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1.5rem;
          background-color: #1a1a1a;
          color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
          height: 60px;
        }

        .admin-header-left {
          display: flex;
          align-items: center;
        }

        .sidebar-toggle {
          background: none;
          border: none;
          color: white;
          font-size: 1.25rem;
          cursor: pointer;
          margin-right: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 4px;
        }

        .sidebar-toggle:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .admin-logo {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .admin-logo a {
          color: white;
          text-decoration: none;
        }

        .admin-logo-text {
          color: #4a9eff;
        }

        .admin-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .notification-button {
          background: none;
          border: none;
          color: white;
          font-size: 1.25rem;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
        }

        .notification-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .notification-badge {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #f44336;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 320px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          margin-top: 0.5rem;
          overflow: hidden;
        }

        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }

        .notification-header h3 {
          margin: 0;
          font-size: 1rem;
          color: #333;
        }

        .mark-all-read {
          background: none;
          border: none;
          color: #4a9eff;
          font-size: 0.75rem;
          cursor: pointer;
        }

        .notification-list {
          max-height: 300px;
          overflow-y: auto;
        }

        .notification-item {
          display: flex;
          padding: 1rem;
          border-bottom: 1px solid #f5f5f5;
          transition: background-color 0.2s ease;
        }

        .notification-item:hover {
          background-color: #f9f9f9;
        }

        .notification-item.unread {
          background-color: #f0f7ff;
        }

        .notification-icon {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: #e0e0e0;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.75rem;
          flex-shrink: 0;
        }

        .notification-content {
          flex: 1;
        }

        .notification-text {
          margin: 0 0 0.25rem 0;
          font-size: 0.875rem;
          color: #333;
        }

        .notification-time {
          margin: 0;
          font-size: 0.75rem;
          color: #999;
        }

        .notification-footer {
          padding: 0.75rem 1rem;
          text-align: center;
          border-top: 1px solid #eee;
        }

        .notification-footer a {
          color: #4a9eff;
          text-decoration: none;
          font-size: 0.875rem;
        }

        .notification-footer a:hover {
          text-decoration: underline;
        }

        .user-menu-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
        }

        .user-menu-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        .user-avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: #4a9eff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          margin-right: 0.5rem;
        }

        .user-name {
          font-size: 0.875rem;
        }

        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 280px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          margin-top: 0.5rem;
          overflow: hidden;
        }

        .user-info {
          display: flex;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }

        .user-avatar-large {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background-color: #4a9eff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.25rem;
          margin-right: 1rem;
        }

        .user-details {
          flex: 1;
        }

        .user-name-large {
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          color: #333;
          font-weight: 600;
        }

        .user-email {
          margin: 0;
          font-size: 0.75rem;
          color: #999;
        }

        .user-menu-items {
          padding: 0.5rem 0;
        }

        .user-menu-item {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          color: #333;
          text-decoration: none;
          font-size: 0.875rem;
          transition: background-color 0.2s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }

        .user-menu-item:hover {
          background-color: #f5f5f5;
        }

        .user-menu-item svg {
          margin-right: 0.75rem;
          width: 1rem;
        }

        .user-menu-item.logout {
          color: #f44336;
        }

        @media (max-width: 768px) {
          .user-name {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default AdminHeader; 