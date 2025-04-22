import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHead from '@/components/admin/AdminHead';

// Mock data for content
const initialContent = [
  {
    id: 1,
    title: 'Homepage Hero',
    type: 'Text',
    content: 'Welcome to Planet Sayari Bank - Your Trusted Financial Partner',
    location: 'Homepage',
    lastUpdated: '2023-05-10'
  },
  {
    id: 2,
    title: 'About Us Description',
    type: 'Text',
    content: 'Planet Sayari Bank is a leading financial institution dedicated to providing innovative banking solutions.',
    location: 'About Page',
    lastUpdated: '2023-04-15'
  },
  {
    id: 3,
    title: 'Contact Information',
    type: 'Text',
    content: 'Email: info@planetsayaribank.com | Phone: +1 (555) 123-4567',
    location: 'Contact Page',
    lastUpdated: '2023-03-20'
  }
];

const ContentManagement = () => {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [currentContent, setCurrentContent] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Text',
    content: '',
    location: '',
    lastUpdated: new Date().toISOString().split('T')[0]
  });

  // Check if user is authenticated
  useEffect(() => {
    setIsClient(true);
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddContent = () => {
    setIsAddingContent(true);
    setFormData({
      title: '',
      type: 'Text',
      content: '',
      location: '',
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  };

  const handleEditContent = (contentItem) => {
    setIsEditingContent(true);
    setCurrentContent(contentItem);
    setFormData({
      title: contentItem.title,
      type: contentItem.type,
      content: contentItem.content,
      location: contentItem.location,
      lastUpdated: contentItem.lastUpdated
    });
  };

  const handleDeleteContent = (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContent(content.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isAddingContent) {
      // Add new content
      const newContent = {
        id: content.length > 0 ? Math.max(...content.map(c => c.id)) + 1 : 1,
        ...formData
      };
      setContent([...content, newContent]);
      setIsAddingContent(false);
    } else if (isEditingContent) {
      // Update existing content
      setContent(content.map(item => 
        item.id === currentContent.id ? { ...item, ...formData } : item
      ));
      setIsEditingContent(false);
      setCurrentContent(null);
    }
  };

  const handleCancel = () => {
    setIsAddingContent(false);
    setIsEditingContent(false);
    setCurrentContent(null);
  };

  if (!isClient) {
    return null;
  }

  return (
    <AdminLayout>
      <AdminHead title="Content Management" description="Manage your website content" />
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>Content Management</h1>
          <button 
            className="add-button"
            onClick={() => setIsAddingContent(true)}
          >
            Add New Content
          </button>
        </div>
        
        <div className="admin-container">
          <div className="admin-content">
            <div className="admin-actions">
              <button 
                className="admin-button" 
                onClick={handleAddContent}
                disabled={isAddingContent || isEditingContent}
              >
                Add New Content
              </button>
            </div>
            
            {(isAddingContent || isEditingContent) && (
              <div className="admin-form-container">
                <h2>{isAddingContent ? 'Add New Content' : 'Edit Content'}</h2>
                <form onSubmit={handleSubmit} className="admin-form">
                  <div className="admin-form-group">
                    <label htmlFor="title">Content Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="type">Content Type</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option value="Text">Text</option>
                      <option value="HTML">HTML</option>
                      <option value="Image">Image</option>
                      <option value="Video">Video</option>
                    </select>
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      required
                      rows="6"
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Homepage, About Page"
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="lastUpdated">Last Updated</label>
                    <input
                      type="date"
                      id="lastUpdated"
                      name="lastUpdated"
                      value={formData.lastUpdated}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="admin-form-actions">
                    <button type="submit" className="admin-button">
                      {isAddingContent ? 'Add Content' : 'Update Content'}
                    </button>
                    <button 
                      type="button" 
                      className="admin-button admin-button-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="admin-table-container">
              <h2>Content List</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Last Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {content.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.type}</td>
                      <td>{item.location}</td>
                      <td>{item.lastUpdated}</td>
                      <td className="admin-table-actions">
                        <button 
                          className="admin-button admin-button-small"
                          onClick={() => handleEditContent(item)}
                        >
                          Edit
                        </button>
                        <button 
                          className="admin-button admin-button-small admin-button-danger"
                          onClick={() => handleDeleteContent(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .admin-page {
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
          transition: background-color 0.2s;
        }
        
        .admin-back-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .admin-container {
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 2rem;
        }
        
        .admin-content {
          background-color: white;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .admin-actions {
          margin-bottom: 2rem;
        }
        
        .admin-button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background-color: #1976d2;
          color: white;
          border: none;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .admin-button:hover {
          background-color: #1565c0;
        }
        
        .admin-button:disabled {
          background-color: #bdbdbd;
          cursor: not-allowed;
        }
        
        .admin-button-secondary {
          background-color: #f5f5f5;
          color: #333;
          border: 1px solid #ddd;
        }
        
        .admin-button-secondary:hover {
          background-color: #e0e0e0;
        }
        
        .admin-button-danger {
          background-color: #f44336;
        }
        
        .admin-button-danger:hover {
          background-color: #d32f2f;
        }
        
        .admin-button-small {
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        }
        
        .admin-form-container {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background-color: #f9f9f9;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }
        
        .admin-form-container h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #333;
        }
        
        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
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
        
        .admin-form-group input,
        .admin-form-group select,
        .admin-form-group textarea {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .admin-form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .admin-table-container {
          margin-top: 2rem;
        }
        
        .admin-table-container h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #333;
        }
        
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .admin-table th,
        .admin-table td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .admin-table th {
          background-color: #f5f5f5;
          font-weight: 500;
        }
        
        .admin-table-actions {
          display: flex;
          gap: 0.5rem;
        }
      `}</style>
    </AdminLayout>
  );
};

export default ContentManagement; 