import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faNewspaper, faUsers, faSpinner } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    projects: 0,
    contentItems: 0,
    teamMembers: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  
  // Check if user is authenticated and fetch stats
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin');
      return;
    }

    // Fetch real-time stats
    const fetchStats = () => {
      try {
        setLoading(true);
        
        // Get projects count
        const storedProjects = localStorage.getItem('projects');
        let projectsCount = 0;
        if (storedProjects) {
          try {
            const parsedProjects = JSON.parse(storedProjects);
            if (Array.isArray(parsedProjects)) {
              projectsCount = parsedProjects.length;
            }
          } catch (e) {
            console.error('Error parsing projects:', e);
          }
        }
        
        // Get team members count
        const storedTeamMembers = localStorage.getItem('teamMembers');
        let teamMembersCount = 0;
        if (storedTeamMembers) {
          try {
            const parsedTeamMembers = JSON.parse(storedTeamMembers);
            if (Array.isArray(parsedTeamMembers)) {
              teamMembersCount = parsedTeamMembers.length;
            }
          } catch (e) {
            console.error('Error parsing team members:', e);
          }
        }
        
        // Get content items count (this is a placeholder - adjust based on your actual content storage)
        const storedContent = localStorage.getItem('content');
        let contentCount = 0;
        if (storedContent) {
          try {
            const parsedContent = JSON.parse(storedContent);
            if (Array.isArray(parsedContent)) {
              contentCount = parsedContent.length;
            }
          } catch (e) {
            console.error('Error parsing content:', e);
          }
        }
        
        // Update stats
        setStats({
          projects: projectsCount,
          contentItems: contentCount,
          teamMembers: teamMembersCount
        });
        
        // Generate recent activity based on localStorage timestamps
        const activity = [];
        
        // Check for recent project changes
        const projectTimestamp = localStorage.getItem('projectsLastUpdated');
        if (projectTimestamp) {
          const date = new Date(parseInt(projectTimestamp));
          activity.push({
            text: 'Projects were updated',
            date: date
          });
        }
        
        // Check for recent team changes
        const teamTimestamp = localStorage.getItem('teamMembersLastUpdated');
        if (teamTimestamp) {
          const date = new Date(parseInt(teamTimestamp));
          activity.push({
            text: 'Team members were updated',
            date: date
          });
        }
        
        // Check for recent content changes
        const contentTimestamp = localStorage.getItem('contentLastUpdated');
        if (contentTimestamp) {
          const date = new Date(parseInt(contentTimestamp));
          activity.push({
            text: 'Content was updated',
            date: date
          });
        }
        
        // Sort by date (most recent first)
        activity.sort((a, b) => b.date - a.date);
        
        // Take only the 5 most recent activities
        setRecentActivity(activity.slice(0, 5));
        
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };
  
  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
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
                {loading ? (
                  <div className="loading-container">
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                    <p>Loading dashboard data...</p>
                  </div>
                ) : (
                  <>
                    <div className="admin-stats">
                      <div className="admin-stat-card">
                        <FontAwesomeIcon icon={faProjectDiagram} className="stat-icon" />
                        <h3>Projects</h3>
                        <p className="admin-stat-number">{stats.projects}</p>
                        <Link href="/admin/projects" className="admin-stat-link">
                          Manage Projects
                        </Link>
                      </div>
                      <div className="admin-stat-card">
                        <FontAwesomeIcon icon={faNewspaper} className="stat-icon" />
                        <h3>Content Items</h3>
                        <p className="admin-stat-number">{stats.contentItems}</p>
                        <Link href="/admin/content" className="admin-stat-link">
                          Manage Content
                        </Link>
                      </div>
                      <div className="admin-stat-card">
                        <FontAwesomeIcon icon={faUsers} className="stat-icon" />
                        <h3>Team Members</h3>
                        <p className="admin-stat-number">{stats.teamMembers}</p>
                        <Link href="/admin/team" className="admin-stat-link">
                          Manage Team
                        </Link>
                      </div>
                    </div>
                    <div className="admin-recent-activity">
                      <h3>Recent Activity</h3>
                      {recentActivity.length > 0 ? (
                        <ul className="admin-activity-list">
                          {recentActivity.map((activity, index) => (
                            <li key={index}>
                              {activity.text} - {formatDate(activity.date)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No recent activity</p>
                      )}
                    </div>
                  </>
                )}
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
              </div>
            )}
          </main>
        </div>
      </div>
      
      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background-color: #f5f5f5;
        }
        
        .admin-header {
          background-color: #1a237e;
          color: white;
          padding: 1rem;
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
          background-color: #f44336;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        
        .admin-container {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          gap: 1rem;
        }
        
        .admin-sidebar {
          width: 200px;
          background-color: white;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 1rem;
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
          padding: 0.5rem;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          font-weight: 500;
        }
        
        .admin-nav li.active button {
          background-color: #1a237e;
          color: white;
        }
        
        .admin-content {
          flex: 1;
          background-color: white;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 1rem;
        }
        
        .admin-section h2 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #1a237e;
          border-bottom: 1px solid #e0e0e0;
          padding-bottom: 0.5rem;
        }
        
        .admin-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .admin-stat-card {
          background-color: #f9f9f9;
          border-radius: 4px;
          padding: 1rem;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s;
        }
        
        .admin-stat-card:hover {
          transform: translateY(-5px);
        }
        
        .stat-icon {
          font-size: 2rem;
          color: #1a237e;
          margin-bottom: 0.5rem;
        }
        
        .admin-stat-card h3 {
          margin: 0.5rem 0;
          color: #333;
        }
        
        .admin-stat-number {
          font-size: 2rem;
          font-weight: bold;
          color: #1a237e;
          margin: 0.5rem 0;
        }
        
        .admin-stat-link {
          display: inline-block;
          background-color: #1a237e;
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          margin-top: 0.5rem;
          transition: background-color 0.2s;
        }
        
        .admin-stat-link:hover {
          background-color: #0d1757;
        }
        
        .admin-recent-activity {
          background-color: #f9f9f9;
          border-radius: 4px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .admin-recent-activity h3 {
          margin-top: 0;
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
        
        .admin-actions {
          margin-bottom: 1rem;
        }
        
        .admin-button {
          display: inline-block;
          background-color: #1a237e;
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .admin-button:hover {
          background-color: #0d1757;
        }
        
        .admin-pages-list,
        .admin-components-list {
          margin-top: 1rem;
        }
        
        .admin-pages-list h3,
        .admin-components-list h3 {
          margin-top: 0;
          color: #333;
        }
        
        .admin-pages-list ul,
        .admin-components-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .admin-pages-list li,
        .admin-components-list li {
          margin-bottom: 0.5rem;
        }
        
        .admin-page-link,
        .admin-component-link {
          color: #1a237e;
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .admin-page-link:hover,
        .admin-component-link:hover {
          color: #0d1757;
          text-decoration: underline;
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: #1a237e;
        }
        
        .loading-container p {
          margin-top: 1rem;
        }
        
        @media (max-width: 768px) {
          .admin-container {
            flex-direction: column;
          }
          
          .admin-sidebar {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default AdminDashboard; 