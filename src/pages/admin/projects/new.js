import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Simple AdminLayout component
const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <Link href="/admin" className="admin-nav-item">
            Dashboard
          </Link>
          <Link href="/admin/team" className="admin-nav-item">
            Team
          </Link>
          <Link href="/admin/projects" className="admin-nav-item active">
            Projects
          </Link>
          <Link href="/admin/content" className="admin-nav-item">
            Content
          </Link>
        </nav>
      </div>
      <div className="admin-content">
        {children}
      </div>
      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
        }
        .admin-sidebar {
          width: 250px;
          background-color: #1a1a2e;
          color: white;
          padding: 20px;
        }
        .admin-logo {
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 20px;
        }
        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .admin-nav-item {
          padding: 10px 15px;
          border-radius: 5px;
          color: white;
          text-decoration: none;
          transition: background-color 0.3s;
        }
        .admin-nav-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .admin-nav-item.active {
          background-color: #4a4af4;
        }
        .admin-content {
          flex: 1;
          padding: 20px;
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

const NewProject = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    symbol: '',
    shortDescription: '',
    description: '',
    image: '',
    idoPrice: '',
    hardCap: '',
    softCap: '',
    totalSupply: '',
    initialMarketCap: '',
    vestingPeriod: '',
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
      website: '',
      whitepaper: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [
        ...prev.features,
        { title: '', description: '', icon: 'fa-star' }
      ]
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleAddTokenomicsItem = (type) => {
    setFormData(prev => ({
      ...prev,
      tokenomics: {
        ...prev.tokenomics,
        [type]: [
          ...prev.tokenomics[type],
          { category: '', percentage: '' }
        ]
      }
    }));
  };

  const handleTokenomicsChange = (type, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      tokenomics: {
        ...prev.tokenomics,
        [type]: prev.tokenomics[type].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const handleRemoveTokenomicsItem = (type, index) => {
    setFormData(prev => ({
      ...prev,
      tokenomics: {
        ...prev.tokenomics,
        [type]: prev.tokenomics[type].filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddRoadmapItem = () => {
    setFormData(prev => ({
      ...prev,
      roadmap: [
        ...prev.roadmap,
        { quarter: '', title: '', items: [] }
      ]
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

  const handleAddRoadmapMilestone = (index) => {
    setFormData(prev => ({
      ...prev,
      roadmap: prev.roadmap.map((item, i) => 
        i === index ? { ...item, items: [...item.items, ''] } : item
      )
    }));
  };

  const handleRoadmapItemChange = (roadmapIndex, itemIndex, value) => {
    setFormData(prev => ({
      ...prev,
      roadmap: prev.roadmap.map((item, i) => 
        i === roadmapIndex ? {
          ...item,
          items: item.items.map((roadmapItem, j) => 
            j === itemIndex ? value : roadmapItem
          )
        } : item
      )
    }));
  };

  const handleRemoveRoadmapItem = (roadmapIndex, itemIndex) => {
    setFormData(prev => ({
      ...prev,
      roadmap: prev.roadmap.map((item, i) => 
        i === roadmapIndex ? {
          ...item,
          items: item.items.filter((_, j) => j !== itemIndex)
        } : item
      )
    }));
  };

  const handleRemoveRoadmap = (index) => {
    setFormData(prev => ({
      ...prev,
      roadmap: prev.roadmap.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newProject = {
        ...formData,
        id: Date.now().toString()
      };

      // Get existing projects from localStorage
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const updatedProjects = [...existingProjects, newProject];
      
      // Save to localStorage
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      
      // Redirect back to projects list
      router.push('/admin/projects');
    } catch (error) {
      setError('Failed to add project');
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Add New Project | Admin | Torkgo</title>
      </Head>

      <div className="admin-projects">
        <div className="header">
          <Link href="/admin/projects" className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Projects
          </Link>
          <h1>Add New Project</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="symbol">Symbol</label>
              <input
                type="text"
                id="symbol"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="shortDescription">Short Description</label>
              <input
                type="text"
                id="shortDescription"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="idoPrice">IDO Price</label>
              <input
                type="text"
                id="idoPrice"
                name="idoPrice"
                value={formData.idoPrice}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hardCap">Hard Cap</label>
              <input
                type="text"
                id="hardCap"
                name="hardCap"
                value={formData.hardCap}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="softCap">Soft Cap</label>
              <input
                type="text"
                id="softCap"
                name="softCap"
                value={formData.softCap}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="totalSupply">Total Supply</label>
              <input
                type="text"
                id="totalSupply"
                name="totalSupply"
                value={formData.totalSupply}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="initialMarketCap">Initial Market Cap</label>
              <input
                type="text"
                id="initialMarketCap"
                name="initialMarketCap"
                value={formData.initialMarketCap}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="vestingPeriod">Vesting Period</label>
              <input
                type="text"
                id="vestingPeriod"
                name="vestingPeriod"
                value={formData.vestingPeriod}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Features</h3>
            {formData.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <input
                  type="text"
                  placeholder="Feature Title"
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                />
                <textarea
                  placeholder="Feature Description"
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddFeature} className="add-button">
              Add Feature
            </button>
          </div>

          <div className="form-section">
            <h3>Tokenomics</h3>
            <div className="tokenomics-section">
              <h4>Distribution</h4>
              {formData.tokenomics.distribution.map((item, index) => (
                <div key={index} className="tokenomics-item">
                  <input
                    type="text"
                    placeholder="Category"
                    value={item.category}
                    onChange={(e) => handleTokenomicsChange('distribution', index, 'category', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Percentage"
                    value={item.percentage}
                    onChange={(e) => handleTokenomicsChange('distribution', index, 'percentage', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTokenomicsItem('distribution', index)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddTokenomicsItem('distribution')}
                className="add-button"
              >
                Add Distribution Item
              </button>
            </div>

            <div className="tokenomics-section">
              <h4>Vesting Schedule</h4>
              {formData.tokenomics.vesting.map((item, index) => (
                <div key={index} className="tokenomics-item">
                  <input
                    type="text"
                    placeholder="Category"
                    value={item.category}
                    onChange={(e) => handleTokenomicsChange('vesting', index, 'category', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Schedule"
                    value={item.schedule}
                    onChange={(e) => handleTokenomicsChange('vesting', index, 'schedule', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveTokenomicsItem('vesting', index)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddTokenomicsItem('vesting')}
                className="add-button"
              >
                Add Vesting Item
              </button>
            </div>
          </div>

          <div className="form-section">
            <h3>Roadmap</h3>
            {formData.roadmap.map((milestone, index) => (
              <div key={index} className="roadmap-item">
                <input
                  type="text"
                  placeholder="Quarter"
                  value={milestone.quarter}
                  onChange={(e) => handleRoadmapChange(index, 'quarter', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={milestone.title}
                  onChange={(e) => handleRoadmapChange(index, 'title', e.target.value)}
                />
                <div className="roadmap-items">
                  {milestone.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="roadmap-item-row">
                      <input
                        type="text"
                        placeholder="Item"
                        value={item}
                        onChange={(e) => handleRoadmapItemChange(index, itemIndex, e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveRoadmapItem(index, itemIndex)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddRoadmapMilestone(index)}
                    className="add-button"
                  >
                    Add Item
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveRoadmap(index)}
                  className="remove-button"
                >
                  Remove Milestone
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddRoadmapItem} className="add-button">
              Add Milestone
            </button>
          </div>

          <div className="form-section">
            <h3>Social Links</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="socialLinks.twitter">Twitter</label>
                <input
                  type="text"
                  id="socialLinks.twitter"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="socialLinks.telegram">Telegram</label>
                <input
                  type="text"
                  id="socialLinks.telegram"
                  name="socialLinks.telegram"
                  value={formData.socialLinks.telegram}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="socialLinks.website">Website</label>
                <input
                  type="text"
                  id="socialLinks.website"
                  name="socialLinks.website"
                  value={formData.socialLinks.website}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="socialLinks.whitepaper">Whitepaper</label>
                <input
                  type="text"
                  id="socialLinks.whitepaper"
                  name="socialLinks.whitepaper"
                  value={formData.socialLinks.whitepaper}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Saving...' : 'Add Project'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .admin-projects {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background-color: var(--color-background-secondary);
          color: var(--color-text-primary);
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }

        .back-button:hover {
          background-color: var(--color-background-primary);
        }

        h1 {
          font-size: 2rem;
          color: var(--color-primary);
          margin: 0;
        }

        .error-message {
          background-color: var(--color-error-light);
          color: var(--color-error);
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        .project-form {
          background: var(--color-background-secondary);
          padding: 30px;
          border-radius: 10px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        label {
          font-weight: 500;
          color: var(--color-text-primary);
        }

        input, textarea {
          padding: 10px;
          border: 1px solid var(--color-border);
          border-radius: 5px;
          background: var(--color-background-primary);
          color: var(--color-text-primary);
        }

        textarea {
          min-height: 100px;
          resize: vertical;
        }

        .form-section {
          margin-bottom: 30px;
          padding: 20px;
          background: var(--color-background-primary);
          border-radius: 5px;
        }

        h3 {
          font-size: 1.2rem;
          margin: 0 0 20px;
          color: var(--color-text-primary);
        }

        h4 {
          font-size: 1.1rem;
          margin: 15px 0;
          color: var(--color-text-primary);
        }

        .feature-item,
        .tokenomics-item,
        .roadmap-item {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
          align-items: flex-start;
        }

        .roadmap-items {
          width: 100%;
        }

        .roadmap-item-row {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }

        .add-button,
        .remove-button {
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: background-color 0.3s ease;
        }

        .add-button {
          background-color: var(--color-primary);
          color: white;
        }

        .add-button:hover {
          background-color: var(--color-primary-dark);
        }

        .remove-button {
          background-color: var(--color-error);
          color: white;
        }

        .remove-button:hover {
          background-color: var(--color-error-dark);
        }

        .submit-button {
          padding: 10px 20px;
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }

        .submit-button:hover {
          background-color: var(--color-primary-dark);
        }

        .submit-button:disabled {
          background-color: var(--color-text-secondary);
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .feature-item,
          .tokenomics-item,
          .roadmap-item {
            flex-direction: column;
          }

          .roadmap-item-row {
            flex-direction: column;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default NewProject; 