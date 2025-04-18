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

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Load projects from localStorage
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects);
        if (Array.isArray(parsedProjects)) {
          setProjects(parsedProjects);
        }
      } catch (e) {
        console.error('Error parsing stored projects:', e);
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
    }
    setLoading(false);
  }, [router]);

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
    setError('');
    setSuccess('');

    try {
      const newProject = {
        id: uuidv4(),
        ...formData
      };

      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      // Store timestamp for recent activity
      localStorage.setItem('projectsLastUpdated', Date.now().toString());
      
      setSuccess('Project added successfully!');
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
    } catch (error) {
      console.error('Error adding project:', error);
      setError('Failed to add project');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const updatedProjects = projects.filter(project => project.id !== id);
        setProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        
        // Store timestamp for recent activity
        localStorage.setItem('projectsLastUpdated', Date.now().toString());
        
        setSuccess('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        setError('Failed to delete project');
      }
    }
  };

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
                  <td>{project.title}</td>
                  <td>{project.symbol}</td>
                  <td className="id-cell">{project.id.substring(0, 8)}...</td>
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