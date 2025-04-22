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
      <div className="footer-content">
        <div className="footer-left">
          <p className="copyright">
            &copy; {currentYear} Admin Panel. All rights reserved.
          </p>
        </div>
        
        <div className="footer-right">
          <a href="/admin/help" className="footer-link">
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span>Help</span>
          </a>
          <a href="/admin/security" className="footer-link">
            <FontAwesomeIcon icon={faShieldAlt} />
            <span>Security</span>
          </a>
          <div className="footer-link">
            <FontAwesomeIcon icon={faCode} />
            <span>v1.0.0</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-footer {
          background-color: #ffffff;
          border-top: 1px solid #dee2e6;
          padding: 1rem 1.5rem;
          font-size: 0.875rem;
          color: #6c757d;
          box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-left {
          display: flex;
          align-items: center;
        }

        .copyright {
          margin: 0;
        }

        .footer-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .footer-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6c757d;
          text-decoration: none;
          transition: color 0.15s ease-in-out;
        }

        .footer-link:hover {
          color: #495057;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .footer-right {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default AdminFooter; 