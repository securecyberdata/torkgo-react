import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { projects as initialProjects } from '@/data/projectData';

const ProjectsManagement = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    symbol: '',
    shortDescription: '',
    description: '',
    image: '',
    totalSupply: '',
    initialMarketCap: '',
    idoPrice: '',
    vestingPeriod: '',
    softCap: '',
    hardCap: '',
    raisedAmount: '',
    targetAmount: '',
    currency: '',
    roundName: '',
    participants: '',
    projectStart: '',
    features: [],
    tokenomics: {
      distribution: [],
      vesting: []
    },
    roadmap: [],
    team: [],
    socialLinks: {
      twitter: '',
      telegram: '',
      discord: '',
      medium: ''
    }
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProject = () => {
    setIsEditing(false);
    setCurrentProject(null);
    setFormData({
      title: '',
      symbol: '',
      shortDescription: '',
      description: '',
      image: '',
      totalSupply: '',
      initialMarketCap: '',
      idoPrice: '',
      vestingPeriod: '',
      softCap: '',
      hardCap: '',
      raisedAmount: '',
      targetAmount: '',
      currency: '',
      roundName: '',
      participants: '',
      projectStart: '',
      features: [],
      tokenomics: {
        distribution: [],
        vesting: []
      },
      roadmap: [],
      team: [],
      socialLinks: {
        twitter: '',
        telegram: '',
        discord: '',
        medium: ''
      }
    });
  };

  const handleEditProject = (project) => {
    setIsEditing(true);
    setCurrentProject(project);
    setFormData(project);
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedProjects;

    if (isEditing) {
      // Update existing project
      updatedProjects = projects.map(project => 
        project.id === currentProject.id ? { ...formData, id: project.id } : project
      );
    } else {
      // Add new project
      const newProject = {
        ...formData,
        id: Math.max(...projects.map(p => p.id)) + 1
      };
      updatedProjects = [...projects, newProject];
    }

    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setIsEditing(false);
    setCurrentProject(null);
  };

  return (
    <>
      <Head>
        <title>Projects Management - Admin Dashboard</title>
      </Head>

      <div className="admin-container">
        <div className="admin-header">
          <h1>Projects Management</h1>
          <button onClick={handleAddProject} className="add-button">
            Add New Project
          </button>
        </div>

        {(isEditing || currentProject) && (
          <form onSubmit={handleSubmit} className="project-form">
            <h2>{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
            
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Symbol</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Short Description</label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Total Supply</label>
                <input
                  type="text"
                  name="totalSupply"
                  value={formData.totalSupply}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Initial Market Cap</label>
                <input
                  type="text"
                  name="initialMarketCap"
                  value={formData.initialMarketCap}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>IDO Price</label>
                <input
                  type="text"
                  name="idoPrice"
                  value={formData.idoPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Vesting Period</label>
                <input
                  type="text"
                  name="vestingPeriod"
                  value={formData.vestingPeriod}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Soft Cap</label>
                <input
                  type="text"
                  name="softCap"
                  value={formData.softCap}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Hard Cap</label>
                <input
                  type="text"
                  name="hardCap"
                  value={formData.hardCap}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Raised Amount</label>
                <input
                  type="number"
                  name="raisedAmount"
                  value={formData.raisedAmount}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Target Amount</label>
                <input
                  type="number"
                  name="targetAmount"
                  value={formData.targetAmount}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Currency</label>
                <input
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Round Name</label>
                <input
                  type="text"
                  name="roundName"
                  value={formData.roundName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Participants</label>
                <input
                  type="number"
                  name="participants"
                  value={formData.participants}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Project Start</label>
                <input
                  type="text"
                  name="projectStart"
                  value={formData.projectStart}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-button">
                {isEditing ? 'Update Project' : 'Add Project'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentProject(null);
                }}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

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
                      <button
                        onClick={() => handleEditProject(project)}
                        className="edit-button"
                      >
                        Edit
                      </button>
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
        }

        .project-form {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        input, textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        textarea {
          min-height: 100px;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .submit-button {
          background-color: #4CAF50;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .cancel-button {
          background-color: #f44336;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
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