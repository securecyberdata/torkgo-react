import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faUsers, 
  faNewspaper, 
  faCog,
  faPlus,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHead from '@/components/admin/AdminHead';

const AdminDashboard = () => {
  const router = useRouter();
  const [stats, setStats] = useState({
    projectsCount: 0,
    teamMembersCount: 0,
    contentItemsCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if user is authenticated
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }

    // Load data from localStorage
    const loadData = () => {
      try {
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        const teamMembers = JSON.parse(localStorage.getItem('teamMembers') || '[]');
        const contentItems = JSON.parse(localStorage.getItem('contentItems') || '[]');

        setStats({
          projectsCount: projects.length,
          teamMembersCount: teamMembers.length,
          contentItemsCount: contentItems.length
        });
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  if (!isClient) {
    return null;
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading">Loading dashboard data...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminHead title="Dashboard" description="Admin dashboard overview" />

      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Welcome to your admin dashboard</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <div className="stat-content">
              <h3>Projects</h3>
              <p className="stat-number">{stats.projectsCount}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="stat-content">
              <h3>Team Members</h3>
              <p className="stat-number">{stats.teamMembersCount}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faNewspaper} />
            </div>
            <div className="stat-content">
              <h3>Content Items</h3>
              <p className="stat-number">{stats.contentItemsCount}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faCog} />
            </div>
            <div className="stat-content">
              <h3>Analytics</h3>
              <p className="stat-number">Coming Soon</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              <p>No recent activity to display</p>
            </div>
          </div>

          <div className="dashboard-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <button className="action-button">
                <FontAwesomeIcon icon={faPlus} />
                Add New Project
              </button>
              <button className="action-button">
                <FontAwesomeIcon icon={faEdit} />
                Edit Content
              </button>
              <button className="action-button">
                <FontAwesomeIcon icon={faTrash} />
                Manage Team
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard {
          padding: 1.5rem;
        }

        .dashboard-header {
          margin-bottom: 1.5rem;
        }

        .dashboard-header h1 {
          font-size: 1.5rem;
          color: #212529;
          margin: 0 0 0.5rem 0;
        }

        .dashboard-header p {
          color: #6c757d;
          margin: 0;
          font-size: 0.875rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          width: 3rem;
          height: 3rem;
          background-color: #e9ecef;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: #495057;
        }

        .stat-content h3 {
          font-size: 0.875rem;
          color: #6c757d;
          margin: 0 0 0.25rem 0;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 600;
          color: #212529;
          margin: 0;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .dashboard-card {
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
          padding: 1.5rem;
        }

        .dashboard-card h2 {
          font-size: 1.25rem;
          color: #212529;
          margin: 0 0 1rem 0;
        }

        .activity-list {
          color: #6c757d;
          font-size: 0.875rem;
        }

        .quick-actions {
          display: grid;
          gap: 0.75rem;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background-color: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 0.375rem;
          color: #495057;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.15s ease-in-out;
        }

        .action-button:hover {
          background-color: #e9ecef;
          color: #212529;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #6c757d;
        }
      `}</style>
    </AdminLayout>
  );
};

export default AdminDashboard; 