import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHead from '@/components/admin/AdminHead';

const PageEditor = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [page, setPage] = useState({
    id: 0,
    title: '',
    path: '',
    content: '',
    metaDescription: '',
    status: 'Draft',
    lastUpdated: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Check if user is authenticated
  useEffect(() => {
    setIsClient(true);
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
    }
  }, [router]);
  
  // Fetch page data when ID is available
  useEffect(() => {
    if (id) {
      // In a real application, this would be an API call
      // For now, we'll simulate loading with mock data
      setTimeout(() => {
        setPage({
          id: parseInt(id),
          title: 'Home Page',
          path: '/',
          content: '<h1>Welcome to Our Platform</h1><p>This is the home page content.</p>',
          metaDescription: 'Welcome to our platform - the leading crypto investment platform',
          status: 'Published',
          lastUpdated: '2023-05-15'
        });
        setIsLoading(false);
      }, 500);
    }
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPage({
      ...page,
      [name]: value
    });
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // In a real application, this would be an API call
    setTimeout(() => {
      setPage({
        ...page,
        lastUpdated: new Date().toISOString().split('T')[0]
      });
      setIsSaving(false);
    }, 1000);
  };
  
  const handlePublish = () => {
    setIsSaving(true);
    
    // In a real application, this would be an API call
    setTimeout(() => {
      setPage({
        ...page,
        status: 'Published',
        lastUpdated: new Date().toISOString().split('T')[0]
      });
      setIsSaving(false);
    }, 1000);
  };
  
  if (!isClient) {
    return null;
  }
  
  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner"></div>
        <p>Loading page data...</p>
      </div>
    );
  }
  
  return (
    <AdminLayout>
      <AdminHead title="Page Editor" description="Edit your website page" />
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>Page Editor</h1>
          <Link href="/admin/pages" className="back-button">
            Back to Pages
          </Link>
        </div>
        
        <div className="admin-container">
          <div className="admin-content">
            <div className="admin-section">
              <div className="admin-form">
                <div className="admin-form-group">
                  <label htmlFor="title">Page Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={page.title}
                    onChange={handleInputChange}
                    className="admin-input"
                  />
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="path">Page Path</label>
                  <input
                    type="text"
                    id="path"
                    name="path"
                    value={page.path}
                    onChange={handleInputChange}
                    className="admin-input"
                  />
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="metaDescription">Meta Description</label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={page.metaDescription}
                    onChange={handleInputChange}
                    className="admin-textarea"
                    rows="3"
                  />
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="content">Page Content</label>
                  <textarea
                    id="content"
                    name="content"
                    value={page.content}
                    onChange={handleInputChange}
                    className="admin-textarea admin-textarea-large"
                    rows="15"
                  />
                </div>
                
                <div className="admin-form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={page.status}
                    onChange={handleInputChange}
                    className="admin-select"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
                
                <div className="admin-form-actions">
                  <button 
                    className="admin-button admin-button-secondary"
                    onClick={() => router.push('/admin/pages')}
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button 
                    className="admin-button"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Draft'}
                  </button>
                  <button 
                    className="admin-button admin-button-primary"
                    onClick={handlePublish}
                    disabled={isSaving || page.status === 'Published'}
                  >
                    {isSaving ? 'Publishing...' : 'Publish'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .admin-page-editor {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .admin-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          color: #666;
        }
        
        .admin-loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #1976d2;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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
        
        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .admin-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .admin-form-group label {
          font-weight: 500;
          color: #333;
        }
        
        .admin-input,
        .admin-textarea,
        .admin-select {
          padding: 0.75rem;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        
        .admin-input:focus,
        .admin-textarea:focus,
        .admin-select:focus {
          border-color: #1976d2;
          outline: none;
        }
        
        .admin-textarea-large {
          font-family: monospace;
          resize: vertical;
        }
        
        .admin-form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
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
        
        .admin-button:hover:not(:disabled) {
          background-color: #1565c0;
        }
        
        .admin-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .admin-button-secondary {
          background-color: #f5f5f5;
          color: #333;
        }
        
        .admin-button-secondary:hover:not(:disabled) {
          background-color: #e0e0e0;
        }
        
        .admin-button-primary {
          background-color: #2e7d32;
        }
        
        .admin-button-primary:hover:not(:disabled) {
          background-color: #1b5e20;
        }
      `}</style>
    </AdminLayout>
  );
};

export default PageEditor; 