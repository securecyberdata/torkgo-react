import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faProjectDiagram, 
  faNewspaper, 
  faChartLine,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const router = useRouter();
  const [stats, setStats] = useState({
    projectsCount: 0,
    teamMembersCount: 0,
    contentItemsCount: 0
  });
  const [activity, setActivity] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Get projects count
    const storedProjects = localStorage.getItem('projects');
    let projectsCount = 0;
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects);
        if (Array.isArray(parsedProjects)) {
          projectsCount = parsedProjects.length;
          console.log(`Dashboard: Found ${projectsCount} projects`);
        } else {
          console.error('Dashboard: Stored projects is not an array:', parsedProjects);
        }
      } catch (e) {
        console.error('Dashboard: Error parsing projects:', e);
      }
    } else {
      console.log('Dashboard: No projects found in localStorage');
    }

    // Get team members count
    const storedTeamMembers = localStorage.getItem('teamMembers');
    let teamMembersCount = 0;
    if (storedTeamMembers) {
      try {
        const parsedTeamMembers = JSON.parse(storedTeamMembers);
        if (Array.isArray(parsedTeamMembers)) {
          teamMembersCount = parsedTeamMembers.length;
          console.log(`Dashboard: Found ${teamMembersCount} team members`);
        }
      } catch (e) {
        console.error('Dashboard: Error parsing team members:', e);
      }
    } else {
      console.log('Dashboard: No team members found in localStorage');
    }

    // Get content items count (placeholder)
    const contentItemsCount = 5;

    setStats({
      projectsCount,
      teamMembersCount,
      contentItemsCount
    });

    // Get recent activity
    const recentActivity = [];

    // Check for recent project changes
    const projectsTimestamp = localStorage.getItem('projectsLastUpdated');
    if (projectsTimestamp) {
      try {
        // Try to parse as ISO string first
        let date;
        try {
          date = new Date(projectsTimestamp);
          // Check if date is valid
          if (isNaN(date.getTime())) {
            // If not valid, try parsing as integer
            date = new Date(parseInt(projectsTimestamp));
          }
        } catch (e) {
          // If parsing fails, use current date
          date = new Date();
        }
        
        recentActivity.push({
          text: 'Projects were updated',
          date: date
        });
      } catch (e) {
        console.error('Error parsing projects timestamp:', e);
      }
    }

    // Check for recent team changes
    const teamTimestamp = localStorage.getItem('teamMembersLastUpdated');
    if (teamTimestamp) {
      try {
        // Try to parse as ISO string first
        let date;
        try {
          date = new Date(teamTimestamp);
          // Check if date is valid
          if (isNaN(date.getTime())) {
            // If not valid, try parsing as integer
            date = new Date(parseInt(teamTimestamp));
          }
        } catch (e) {
          // If parsing fails, use current date
          date = new Date();
        }
        
        recentActivity.push({
          text: 'Team members were updated',
          date: date
        });
      } catch (e) {
        console.error('Error parsing team timestamp:', e);
      }
    }

    // Check for recent content changes
    const contentTimestamp = localStorage.getItem('contentLastUpdated');
    if (contentTimestamp) {
      try {
        // Try to parse as ISO string first
        let date;
        try {
          date = new Date(contentTimestamp);
          // Check if date is valid
          if (isNaN(date.getTime())) {
            // If not valid, try parsing as integer
            date = new Date(parseInt(contentTimestamp));
          }
        } catch (e) {
          // If parsing fails, use current date
          date = new Date();
        }
        
        recentActivity.push({
          text: 'Content was updated',
          date: date
        });
      } catch (e) {
        console.error('Error parsing content timestamp:', e);
      }
    }

    // Sort activity by date (newest first)
    recentActivity.sort((a, b) => b.date - a.date);
    setActivity(recentActivity);
  }, [router]);

  if (!isClient) {
    return null;
  }

  return (
    <AdminLayout>
      <Head>
        <title>Dashboard | Admin | Torkgo</title>
      </Head>

      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome to the Torkgo admin panel</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faProjectDiagram} />
            </div>
            <div className="stat-content">
              <h3>Projects</h3>
              <p className="stat-value">{stats.projectsCount}</p>
              <Link href="/admin/projects" className="stat-link">Manage Projects</Link>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="stat-content">
              <h3>Team Members</h3>
              <p className="stat-value">{stats.teamMembersCount}</p>
              <Link href="/admin/team" className="stat-link">Manage Team</Link>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faNewspaper} />
            </div>
            <div className="stat-content">
              <h3>Content Items</h3>
              <p className="stat-value">{stats.contentItemsCount}</p>
              <Link href="/admin/content" className="stat-link">Manage Content</Link>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <div className="stat-content">
              <h3>Analytics</h3>
              <p className="stat-value">View</p>
              <Link href="/admin/analytics" className="stat-link">View Analytics</Link>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Recent Activity</h2>
            {activity.length > 0 ? (
              <ul className="activity-list">
                {activity.map((item, index) => (
                  <li key={index} className="activity-item">
                    <div className="activity-icon">
                      <FontAwesomeIcon icon={faArrowUp} />
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">{item.text}</p>
                      <p className="activity-date">
                        {item.date.toLocaleDateString()} {item.date.toLocaleTimeString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-activity">No recent activity</p>
            )}
          </div>

          <div className="dashboard-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <Link href="/admin/projects/new" className="quick-action-button">
                Add New Project
              </Link>
              <Link href="/admin/team/new" className="quick-action-button">
                Add Team Member
              </Link>
              <Link href="/admin/content/new" className="quick-action-button">
                Create Content
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard {
          padding: 1rem;
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }

        .dashboard-header h1 {
          font-size: 1.75rem;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          color: #666;
          font-size: 0.875rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background-color: #4a9eff;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          margin-right: 1rem;
        }

        .stat-content {
          flex: 1;
        }

        .stat-content h3 {
          font-size: 0.875rem;
          color: #666;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .stat-link {
          font-size: 0.75rem;
          color: #4a9eff;
          text-decoration: none;
          display: inline-block;
        }

        .stat-link:hover {
          text-decoration: underline;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .dashboard-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
        }

        .dashboard-card h2 {
          font-size: 1.25rem;
          color: #1a1a1a;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #eee;
        }

        .activity-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f5f5f5;
        }

        .activity-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #e8f5e9;
          color: #2e7d32;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          margin-right: 0.75rem;
          margin-top: 0.25rem;
        }

        .activity-content {
          flex: 1;
        }

        .activity-text {
          font-size: 0.875rem;
          color: #333;
          margin-bottom: 0.25rem;
        }

        .activity-date {
          font-size: 0.75rem;
          color: #999;
        }

        .no-activity {
          color: #999;
          font-size: 0.875rem;
          text-align: center;
          padding: 1rem 0;
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .quick-action-button {
          background-color: #f5f5f5;
          color: #333;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 4px;
          font-size: 0.875rem;
          text-decoration: none;
          text-align: center;
          transition: background-color 0.2s ease;
        }

        .quick-action-button:hover {
          background-color: #e0e0e0;
        }

        @media (max-width: 768px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default AdminDashboard; 