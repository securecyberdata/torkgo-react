import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { fetchData } from '@/apiConfig';
import { projects as defaultProjects } from '@/data/projectData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faTimes, faSave, faArrowLeft, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import AdminLayout from '@/components/admin/AdminLayout';
import { v4 as uuidv4 } from 'uuid';

const AdminProjects = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isClient, setIsClient] = useState(false);
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
    tokenomics: [],
    roadmap: [],
    team: [],
    socialLinks: {
      website: '',
      twitter: '',
      telegram: '',
      discord: '',
      github: ''
    }
  });

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run this effect on the client side
    if (!isClient) return;

    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Load projects from localStorage
    try {
      console.log('Loading projects from localStorage...');
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        try {
          const parsedProjects = JSON.parse(storedProjects);
          if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
            console.log(`Found ${parsedProjects.length} projects in localStorage`);
            // Ensure all project IDs are strings
            const projectsWithStringIds = parsedProjects.map(project => ({
              ...project,
              id: String(project.id)
            }));
            setProjects(projectsWithStringIds);
          } else {
            console.log('Stored projects is empty or not an array, using defaults');
            // Ensure all default project IDs are strings
            const defaultProjectsWithStringIds = defaultProjects.map(project => ({
              ...project,
              id: String(project.id)
            }));
            setProjects(defaultProjectsWithStringIds);
            // Store default projects in localStorage for future use
            localStorage.setItem('projects', JSON.stringify(defaultProjectsWithStringIds));
          }
        } catch (parseError) {
          console.error('Error parsing projects from localStorage:', parseError);
          // Ensure all default project IDs are strings
          const defaultProjectsWithStringIds = defaultProjects.map(project => ({
            ...project,
            id: String(project.id)
          }));
          setProjects(defaultProjectsWithStringIds);
          localStorage.setItem('projects', JSON.stringify(defaultProjectsWithStringIds));
        }
      } else {
        console.log('No projects found in localStorage, using defaults');
        // Ensure all default project IDs are strings
        const defaultProjectsWithStringIds = defaultProjects.map(project => ({
          ...project,
          id: String(project.id)
        }));
        setProjects(defaultProjectsWithStringIds);
        // Store default projects in localStorage for future use
        localStorage.setItem('projects', JSON.stringify(defaultProjectsWithStringIds));
      }
    } catch (e) {
      console.error('Error loading projects:', e);
      // Ensure all default project IDs are strings
      const defaultProjectsWithStringIds = defaultProjects.map(project => ({
        ...project,
        id: String(project.id)
      }));
      setProjects(defaultProjectsWithStringIds);
      localStorage.setItem('projects', JSON.stringify(defaultProjectsWithStringIds));
    } finally {
      setLoading(false);
    }
  }, [router, isClient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleFeatureChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const handleAddTokenomics = () => {
    setFormData(prev => ({
      ...prev,
      tokenomics: [...prev.tokenomics, { name: '', percentage: '' }]
    }));
  };

  const handleRemoveTokenomics = (index) => {
    setFormData(prev => ({
      ...prev,
      tokenomics: prev.tokenomics.filter((_, i) => i !== index)
    }));
  };

  const handleTokenomicsChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      tokenomics: prev.tokenomics.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleAddRoadmapItem = () => {
    setFormData(prev => ({
      ...prev,
      roadmap: [...prev.roadmap, { phase: '', description: '' }]
    }));
  };

  const handleRemoveRoadmapItem = (index) => {
    setFormData(prev => ({
      ...prev,
      roadmap: prev.roadmap.filter((_, i) => i !== index)
    }));
  };

  const handleRoadmapChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      roadmap: prev.roadmap.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Ensure features, tokenomics, and roadmap are in the correct format
      const formattedFeatures = formData.features.map(feature => {
        if (typeof feature === 'string') {
          return {
            icon: "faCheck",
            title: feature,
            description: feature
          };
        }
        return feature;
      });

      const formattedTokenomics = formData.tokenomics.map(item => {
        if (typeof item === 'string') {
          return {
            category: item,
            percentage: "0%"
          };
        }
        return item;
      });

      const formattedRoadmap = formData.roadmap.map(item => {
        if (typeof item === 'string') {
          return {
            quarter: "Q1 2024",
            title: item,
            items: [item]
          };
        }
        return item;
      });

      // Ensure ID is always a string
      const projectId = formData.id ? String(formData.id) : uuidv4();

      const newProject = {
        ...formData,
        id: projectId,
        createdAt: formData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        features: formattedFeatures,
        tokenomics: {
          distribution: formattedTokenomics,
          vesting: []
        },
        roadmap: formattedRoadmap
      };

      const updatedProjects = formData.id
        ? projects.map(p => String(p.id) === String(formData.id) ? newProject : p)
        : [...projects, newProject];

      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      localStorage.setItem('projectsLastUpdated', new Date().toISOString());
      setSuccess('Project saved successfully!');
      setError('');
      setFormData({
        id: '',
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
        tokenomics: [],
        roadmap: [],
        socialLinks: {
          website: '',
          twitter: '',
          telegram: '',
          discord: '',
          github: ''
        }
      });
    } catch (err) {
      console.error('Error saving project:', err);
      setError('Failed to save project. Please try again.');
      setSuccess('');
    }
  };

  const handleDelete = (id) => {
    try {
      console.log(`Deleting project with ID: ${id}`);
      // Convert both the project ID and the ID to delete to strings for comparison
      const updatedProjects = projects.filter(p => String(p.id) !== String(id));
      console.log(`Projects after deletion: ${updatedProjects.length}`);
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      localStorage.setItem('projectsLastUpdated', new Date().toISOString());
      setSuccess('Project deleted successfully!');
      setError('');
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project. Please try again.');
      setSuccess('');
    }
  };

  if (!isClient) {
    return (
      <AdminLayout>
        <div className="loading-message">Loading...</div>
      </AdminLayout>
    );
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-message">Loading projects...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Manage Projects | Admin | Torkgo</title>
      </Head>

      <div className="admin-projects">
        <div className="header">
          <h1>Manage Projects</h1>
          <Link href="/admin/projects/new" className="add-button">
            <FontAwesomeIcon icon={faPlus} /> Add New Project
          </Link>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="projects-table">
          <h2>Current Projects</h2>
          {projects.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Symbol</th>
                  <th>ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(project => (
                  <tr key={project.id}>
                    <td>{project.title || 'Untitled Project'}</td>
                    <td>{project.symbol || 'N/A'}</td>
                    <td className="id-cell">
                      {project.id 
                        ? (typeof project.id === 'string' 
                            ? project.id.substring(0, 8) + '...' 
                            : String(project.id))
                        : 'N/A'}
                    </td>
                    <td>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(project.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-projects">
              <p>No projects found. Add your first project using the form below.</p>
            </div>
          )}
        </div>

        <div className="add-project-form">
          <h2>Add New Project</h2>
          <form onSubmit={handleSubmit}>
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
                  type="text"
                  name="raisedAmount"
                  value={formData.raisedAmount}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Target Amount</label>
                <input
                  type="text"
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
                  type="text"
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

            <div className="form-group">
              <label>Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveFeature(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-btn"
                onClick={handleAddFeature}
              >
                Add Feature
              </button>
            </div>

            <div className="form-group">
              <label>Tokenomics</label>
              {formData.tokenomics.map((item, index) => (
                <div key={index} className="tokenomics-item">
                  <input
                    type="text"
                    placeholder="Name"
                    value={item.name}
                    onChange={(e) => handleTokenomicsChange(index, 'name', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Percentage"
                    value={item.percentage}
                    onChange={(e) => handleTokenomicsChange(index, 'percentage', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveTokenomics(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-btn"
                onClick={handleAddTokenomics}
              >
                Add Tokenomics
              </button>
            </div>

            <div className="form-group">
              <label>Roadmap</label>
              {formData.roadmap.map((item, index) => (
                <div key={index} className="roadmap-item">
                  <input
                    type="text"
                    placeholder="Phase"
                    value={item.phase}
                    onChange={(e) => handleRoadmapChange(index, 'phase', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => handleRoadmapChange(index, 'description', e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveRoadmapItem(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-btn"
                onClick={handleAddRoadmapItem}
              >
                Add Roadmap Item
              </button>
            </div>

            <div className="form-group">
              <label>Social Links</label>
              <div className="social-links">
                <input
                  type="text"
                  name="socialLinks.website"
                  placeholder="Website"
                  value={formData.socialLinks.website}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="socialLinks.twitter"
                  placeholder="Twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="socialLinks.telegram"
                  placeholder="Telegram"
                  value={formData.socialLinks.telegram}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="socialLinks.discord"
                  placeholder="Discord"
                  value={formData.socialLinks.discord}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="socialLinks.github"
                  placeholder="GitHub"
                  value={formData.socialLinks.github}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Add Project
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .admin-projects {
          padding: 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        h1 {
          font-size: 2rem;
          color: var(--color-primary);
          margin: 0;
        }

        .add-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }

        .add-button:hover {
          background-color: var(--color-primary-dark);
        }

        .loading-message {
          text-align: center;
          padding: 40px;
          font-size: 1.2rem;
          color: var(--body-color);
        }

        .error-message {
          background-color: #ffebee;
          color: #c62828;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .success-message {
          background-color: #e8f5e9;
          color: #2e7d32;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .projects-table {
          margin-bottom: 40px;
        }

        h2 {
          margin-bottom: 20px;
          color: var(--heading-color);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        th {
          background-color: #f5f5f5;
          font-weight: 600;
        }

        .id-cell {
          font-family: monospace;
          font-size: 0.9rem;
        }

        .delete-btn {
          background-color: #f44336;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }

        .delete-btn:hover {
          background-color: #d32f2f;
        }

        .add-project-form {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
        }

        input, textarea {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        textarea {
          min-height: 100px;
          resize: vertical;
        }

        .feature-item,
        .tokenomics-item,
        .roadmap-item {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          margin-bottom: 10px;
        }

        .remove-btn {
          background-color: #f44336;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }

        .add-btn {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        }

        .submit-btn {
          background-color: #2196f3;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
        }

        .submit-btn:hover {
          background-color: #1976d2;
        }

        .social-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }

          .feature-item,
          .tokenomics-item,
          .roadmap-item {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default AdminProjects; 