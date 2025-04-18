import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faHeart, 
  faShieldAlt, 
  faQuestionCircle 
} from '@fortawesome/free-solid-svg-icons';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="admin-footer">
      <div className="admin-footer-content">
        <div className="admin-footer-left">
          <p className="admin-footer-copyright">
            &copy; {currentYear} Torkgo Admin Panel. All rights reserved.
          </p>
        </div>
        <div className="admin-footer-right">
          <div className="admin-footer-links">
            <a href="/admin/help" className="admin-footer-link">
              <FontAwesomeIcon icon={faQuestionCircle} /> Help
            </a>
            <a href="/admin/security" className="admin-footer-link">
              <FontAwesomeIcon icon={faShieldAlt} /> Security
            </a>
            <a href="/admin/version" className="admin-footer-link">
              <FontAwesomeIcon icon={faCode} /> v1.0.0
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-footer {
          background-color: #1a1a1a;
          color: #e0e0e0;
          padding: 1rem 1.5rem;
          font-size: 0.875rem;
          border-top: 1px solid #333;
        }

        .admin-footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-footer-copyright {
          margin: 0;
        }

        .admin-footer-links {
          display: flex;
          gap: 1.5rem;
        }

        .admin-footer-link {
          color: #e0e0e0;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s ease;
        }

        .admin-footer-link:hover {
          color: #4a9eff;
        }

        .admin-footer-link svg {
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .admin-footer-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .admin-footer-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default AdminFooter; 