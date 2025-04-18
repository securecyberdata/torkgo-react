import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { projects as initialProjects } from '@/data/projectData';

const ProjectsManagement = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Check if user is authenticated
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin');
      return;
    }

    // Load projects from localStorage or use initial data
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(initialProjects);
      localStorage.setItem('projects', JSON.stringify(initialProjects));
    }
  }, [router]);

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
    }
  };

  return (
    <>
      <Head>
        <title>Projects Management - Admin Dashboard</title>
      </Head>

      <div className="admin-container">
        <div className="admin-header">
          <h1>Projects Management</h1>
          <Link href="/admin/projects/new" className="add-button">
            Add New Project
          </Link>
        </div>

        <div className="projects-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Symbol</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.symbol}</td>
                  <td>
                    <span className={`status ${project.status || 'active'}`}>
                      {project.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link href={`/admin/projects/edit/${project.id}`} className="edit-button">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="delete-button"
                      >
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

      <style jsx>{`
        .admin-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .add-button {
          background-color: #4CAF50;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
        }

        .projects-table {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: #f5f5f5;
          font-weight: 500;
        }

        .status {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .status.active {
          background-color: #e8f5e9;
          color: #2e7d32;
        }

        .status.pending {
          background-color: #fff3e0;
          color: #ef6c00;
        }

        .status.completed {
          background-color: #e3f2fd;
          color: #1976d2;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .edit-button {
          background-color: #2196F3;
          color: white;
          padding: 0.25rem 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
        }

        .delete-button {
          background-color: #f44336;
          color: white;
          padding: 0.25rem 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ProjectsManagement; 