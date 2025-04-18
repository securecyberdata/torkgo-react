import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const PagesManagement = () => {
  const router = useRouter();
  const [pages, setPages] = useState([
    {
      id: 1,
      title: 'Home Page',
      path: '/',
      lastUpdated: '2023-05-15',
      status: 'Published'
    },
    {
      id: 2,
      title: 'About Page',
      path: '/about',
      lastUpdated: '2023-05-10',
      status: 'Published'
    },
    {
      id: 3,
      title: 'Contact Page',
      path: '/contact',
      lastUpdated: '2023-05-12',
      status: 'Published'
    },
    {
      id: 4,
      title: 'Terms & Conditions',
      path: '/terms',
      lastUpdated: '2023-05-08',
      status: 'Published'
    },
    {
      id: 5,
      title: 'Privacy Policy',
      path: '/privacy',
      lastUpdated: '2023-05-08',
      status: 'Published'
    },
    {
      id: 6,
      title: 'AML/KYC Policy',
      path: '/aml-kyc',
      lastUpdated: '2023-05-08',
      status: 'Published'
    }
  ]);
  
  // Check if user is authenticated
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin');
    }
  }, [router]);
  
  const handleEditPage = (pageId) => {
    router.push(`/admin/pages/${pageId}`);
  };
  
  return (
    <>
      <Head>
        <title>Pages Management | Admin Dashboard</title>
        <meta name="description" content="Manage site pages" />
      </Head>
      
      <div className="admin-pages">
        <header className="admin-header">
          <div className="admin-header-content">
            <h1>Pages Management</h1>
            <Link href="/admin/dashboard" className="admin-back-link">
              Back to Dashboard
            </Link>
          </div>
        </header>
        
        <div className="admin-container">
          <div className="admin-content">
            <div className="admin-section">
              <div className="admin-actions">
                <button className="admin-button">
                  Create New Page
                </button>
              </div>
              
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Path</th>
                      <th>Last Updated</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((page) => (
                      <tr key={page.id}>
                        <td>{page.title}</td>
                        <td>{page.path}</td>
                        <td>{page.lastUpdated}</td>
                        <td>
                          <span className={`admin-status admin-status-${page.status.toLowerCase()}`}>
                            {page.status}
                          </span>
                        </td>
                        <td>
                          <div className="admin-actions-cell">
                            <button 
                              className="admin-action-button admin-action-edit"
                              onClick={() => handleEditPage(page.id)}
                            >
                              Edit
                            </button>
                            <button className="admin-action-button admin-action-delete">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .admin-pages {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .admin-header {
          background-color: #1976d2;
          color: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .admin-header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .admin-header h1 {
          margin: 0;
          font-size: 1.5rem;
        }
        
        .admin-back-link {
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border: 1px solid white;
          border-radius: 4px;
          transition: all 0.2s;
        }
        
        .admin-back-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .admin-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          width: 100%;
        }
        
        .admin-content {
          background-color: white;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .admin-section h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #333;
        }
        
        .admin-actions {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .admin-button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background-color: #1976d2;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .admin-button:hover {
          background-color: #1565c0;
        }
        
        .admin-table-container {
          overflow-x: auto;
        }
        
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        
        .admin-table th,
        .admin-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .admin-table th {
          background-color: #f5f5f5;
          font-weight: 600;
          color: #333;
        }
        
        .admin-table tr:last-child td {
          border-bottom: none;
        }
        
        .admin-status {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .admin-status-published {
          background-color: #e8f5e9;
          color: #2e7d32;
        }
        
        .admin-status-draft {
          background-color: #fff3e0;
          color: #ef6c00;
        }
        
        .admin-actions-cell {
          display: flex;
          gap: 0.5rem;
        }
        
        .admin-action-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .admin-action-edit {
          background-color: #e3f2fd;
          color: #1976d2;
        }
        
        .admin-action-edit:hover {
          background-color: #bbdefb;
        }
        
        .admin-action-delete {
          background-color: #ffebee;
          color: #d32f2f;
        }
        
        .admin-action-delete:hover {
          background-color: #ffcdd2;
        }
      `}</style>
    </>
  );
};

export default PagesManagement; 