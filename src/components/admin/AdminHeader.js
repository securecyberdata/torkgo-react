import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faBell, 
  faUser, 
  faCog, 
  faSignOutAlt,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';

const AdminHeader = ({ toggleSidebar, isSidebarOpen }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="admin-logo">
          <span>Admin Panel</span>
        </div>
      </div>

      <div className="header-right">
        <div className="notifications">
          <button className="notification-btn">
            <FontAwesomeIcon icon={faBell} />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
          </button>
        </div>

        <div className="user-menu-container">
          <button 
            className="user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <FontAwesomeIcon icon={faUser} />
            <span>Admin</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>

          {showUserMenu && (
            <div className="user-menu-dropdown">
              <button className="menu-item">
                <FontAwesomeIcon icon={faUser} />
                <span>Profile</span>
              </button>
              <button className="menu-item">
                <FontAwesomeIcon icon={faCog} />
                <span>Settings</span>
              </button>
              <button className="menu-item" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </button>
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
          background-color: #ffffff;
          border-bottom: 1px solid #dee2e6;
          height: 60px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .sidebar-toggle {
          background: none;
          border: none;
          color: #495057;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.375rem;
          transition: background-color 0.15s ease-in-out;
        }

        .sidebar-toggle:hover {
          background-color: #f8f9fa;
        }

        .admin-logo {
          font-size: 1.25rem;
          font-weight: 600;
          color: #212529;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .notification-btn {
          background: none;
          border: none;
          color: #495057;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.5rem;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.375rem;
          transition: background-color 0.15s ease-in-out;
        }

        .notification-btn:hover {
          background-color: #f8f9fa;
        }

        .notification-badge {
          position: absolute;
          top: 0;
          right: 0;
          background-color: #dc3545;
          color: white;
          font-size: 0.75rem;
          padding: 0.125rem 0.375rem;
          border-radius: 1rem;
          transform: translate(25%, -25%);
        }

        .user-menu-container {
          position: relative;
        }

        .user-menu-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: #495057;
          font-size: 0.875rem;
          cursor: pointer;
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          transition: background-color 0.15s ease-in-out;
        }

        .user-menu-btn:hover {
          background-color: #f8f9fa;
        }

        .user-menu-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background-color: white;
          border: 1px solid #dee2e6;
          border-radius: 0.375rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          min-width: 200px;
          z-index: 1000;
          margin-top: 0.5rem;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          color: #495057;
          font-size: 0.875rem;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out;
        }

        .menu-item:hover {
          background-color: #f8f9fa;
        }

        .menu-item:not(:last-child) {
          border-bottom: 1px solid #dee2e6;
        }
      `}</style>
    </header>
  );
};

export default AdminHeader; 