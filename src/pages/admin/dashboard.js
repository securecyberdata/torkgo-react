import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Check if user is authenticated
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin');
    }
  }, [router]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };
  
  return (
    <>
      <Head>
        <title>Admin Dashboard | Planet Sayari Bank</title>
        <meta name="description" content="Admin dashboard for Planet Sayari Bank" />
      </Head>
      
      <div className="admin-dashboard">
        <header className="admin-header">
          <div className="admin-header-content">
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout} className="admin-logout-button">
              Logout
            </button>
          </div>
        </header>
        
        <div className="admin-container">
          <nav className="admin-sidebar">
            <ul className="admin-nav">
              <li className={activeTab === 'overview' ? 'active' : ''}>
                <button onClick={() => setActiveTab('overview')}>
                  Overview
                </button>
              </li>
              <li className={activeTab === 'projects' ? 'active' : ''}>
                <button onClick={() => setActiveTab('projects')}>
                  Projects
                </button>
              </li>
              <li className={activeTab === 'content' ? 'active' : ''}>
                <button onClick={() => setActiveTab('content')}>
                  Content
                </button>
              </li>
              <li className={activeTab === 'team' ? 'active' : ''}>
                <button onClick={() => setActiveTab('team')}>
                  Team Members
                </button>
              </li>
              <li className={activeTab === 'pages' ? 'active' : ''}>
                <button onClick={() => setActiveTab('pages')}>
                  Pages
                </button>
              </li>
              <li className={activeTab === 'components' ? 'active' : ''}>
                <button onClick={() => setActiveTab('components')}>
                  Components
                </button>
              </li>
              <li className={activeTab === 'settings' ? 'active' : ''}>
                <button onClick={() => setActiveTab('settings')}>
                  Settings
                </button>
              </li>
            </ul>
          </nav>
          
          <main className="admin-content">
            {activeTab === 'overview' && (
              <div className="admin-section">
                <h2>Dashboard Overview</h2>
                <div className="admin-stats">
                  <div className="admin-stat-card">
                    <h3>Projects</h3>
                    <p className="admin-stat-number">3</p>
                    <Link href="/admin/projects" className="admin-stat-link">
                      Manage Projects
                    </Link>
                  </div>
                  <div className="admin-stat-card">
                    <h3>Content Items</h3>
                    <p className="admin-stat-number">3</p>
                    <Link href="/admin/content" className="admin-stat-link">
                      Manage Content
                    </Link>
                  </div>
                  <div className="admin-stat-card">
                    <h3>Team Members</h3>
                    <p className="admin-stat-number">6</p>
                    <Link href="/admin/team" className="admin-stat-link">
                      Manage Team
                    </Link>
                  </div>
                </div>
                <div className="admin-recent-activity">
                  <h3>Recent Activity</h3>
                  <ul className="admin-activity-list">
                    <li>Test Project was added</li>
                    <li>Team member profile was updated</li>
                    <li>Content was modified</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'projects' && (
              <div className="admin-section">
                <h2>Projects Management</h2>
                <div className="admin-actions">
                  <Link href="/admin/projects" className="admin-button">
                    Manage Projects
                  </Link>
                </div>
              </div>
            )}
            
            {activeTab === 'content' && (
              <div className="admin-section">
                <h2>Content Management</h2>
                <div className="admin-actions">
                  <Link href="/admin/content" className="admin-button">
                    Manage Content
                  </Link>
                </div>
              </div>
            )}
            
            {activeTab === 'team' && (
              <div className="admin-section">
                <h2>Team Members Management</h2>
                <div className="admin-actions">
                  <Link href="/admin/team" className="admin-button">
                    Manage Team Members
                  </Link>
                </div>
              </div>
            )}
            
            {activeTab === 'pages' && (
              <div className="admin-section">
                <h2>Pages Management</h2>
                <div className="admin-actions">
                  <Link href="/admin/pages" className="admin-button">
                    Manage Pages
                  </Link>
                </div>
                <div className="admin-pages-list">
                  <h3>Available Pages</h3>
                  <ul>
                    <li>
                      <Link href="/admin/pages/home" className="admin-page-link">
                        Home Page
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/pages/about" className="admin-page-link">
                        About Page
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/pages/contact" className="admin-page-link">
                        Contact Page
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/pages/terms" className="admin-page-link">
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/pages/privacy" className="admin-page-link">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/pages/aml-kyc" className="admin-page-link">
                        AML/KYC Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'components' && (
              <div className="admin-section">
                <h2>Components Management</h2>
                <div className="admin-actions">
                  <Link href="/admin/components" className="admin-button">
                    Manage Components
                  </Link>
                </div>
                <div className="admin-components-list">
                  <h3>Available Components</h3>
                  <ul>
                    <li>
                      <Link href="/admin/components/header" className="admin-component-link">
                        Header
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/components/footer" className="admin-component-link">
                        Footer
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/components/navigation" className="admin-component-link">
                        Navigation
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/components/hero" className="admin-component-link">
                        Hero Section
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/components/features" className="admin-component-link">
                        Features Section
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/components/testimonials" className="admin-component-link">
                        Testimonials Section
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="admin-section">
                <h2>Site Settings</h2>
                <div className="admin-actions">
                  <Link href="/admin/settings" className="admin-button">
                    Manage Settings
                  </Link>
                </div>
                <div className="admin-settings-list">
                  <h3>Available Settings</h3>
                  <ul>
                    <li>
                      <Link href="/admin/settings/general" className="admin-setting-link">
                        General Settings
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/settings/appearance" className="admin-setting-link">
                        Appearance
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/settings/seo" className="admin-setting-link">
                        SEO Settings
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/settings/social" className="admin-setting-link">
                        Social Media
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/settings/analytics" className="admin-setting-link">
                        Analytics
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      
      <style jsx>{`
        .admin-dashboard {
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
        
        .admin-logout-button {
          background-color: transparent;
          color: white;
          border: 1px solid white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .admin-logout-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .admin-container {
          display: flex;
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 2rem;
        }
        
        .admin-sidebar {
          width: 200px;
          background-color: #f5f5f5;
          border-radius: 8px;
          padding: 1rem;
          margin-right: 2rem;
        }
        
        .admin-nav {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .admin-nav li {
          margin-bottom: 0.5rem;
        }
        
        .admin-nav button {
          width: 100%;
          text-align: left;
          padding: 0.75rem;
          background-color: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .admin-nav li.active button {
          background-color: #1976d2;
          color: white;
        }
        
        .admin-nav button:hover {
          background-color: #e0e0e0;
        }
        
        .admin-nav li.active button:hover {
          background-color: #1565c0;
        }
        
        .admin-content {
          flex: 1;
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
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .admin-button:hover {
          background-color: #1565c0;
        }
        
        .admin-stats {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .admin-stat-card {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .admin-stat-card h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: #333;
        }
        
        .admin-stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #1976d2;
          margin: 0.5rem 0;
        }
        
        .admin-stat-link {
          display: inline-block;
          margin-top: 0.5rem;
          color: #1976d2;
          text-decoration: none;
        }
        
        .admin-stat-link:hover {
          text-decoration: underline;
        }
        
        .admin-recent-activity {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 1.5rem;
          margin-top: 2rem;
        }
        
        .admin-recent-activity h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #333;
        }
        
        .admin-activity-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .admin-activity-list li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .admin-activity-list li:last-child {
          border-bottom: none;
        }
        
        .admin-pages-list,
        .admin-components-list,
        .admin-settings-list {
          background-color: #f9f9f9;
          border-radius: 8px;
          padding: 1.5rem;
          margin-top: 1.5rem;
        }
        
        .admin-pages-list h3,
        .admin-components-list h3,
        .admin-settings-list h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #333;
        }
        
        .admin-pages-list ul,
        .admin-components-list ul,
        .admin-settings-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .admin-pages-list li,
        .admin-components-list li,
        .admin-settings-list li {
          padding: 0.5rem 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .admin-pages-list li:last-child,
        .admin-components-list li:last-child,
        .admin-settings-list li:last-child {
          border-bottom: none;
        }
        
        .admin-page-link,
        .admin-component-link,
        .admin-setting-link {
          color: #1976d2;
          text-decoration: none;
          display: block;
          padding: 0.5rem 0;
        }
        
        .admin-page-link:hover,
        .admin-component-link:hover,
        .admin-setting-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default AdminDashboard; 