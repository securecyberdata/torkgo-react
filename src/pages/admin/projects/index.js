import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faSearch,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHead from '@/components/admin/AdminHead';

const AdminProjects = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    features: '',
    tokenomics: '',
    roadmap: ''
  });

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load projects from API
  useEffect(() => {
    if (!isClient) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError('');
        
        console.log('Fetching projects...');
        const response = await fetch('/api/projects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          
          try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.error || 'Failed to fetch projects');
          } catch (parseError) {
            throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
          }
        }

        const result = await response.json();
        console.log('Projects fetched:', result);
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to fetch projects');
        }
        
        setProjects(result.data || []);
        setError('');
      } catch (err) {
        console.error('Error loading projects:', err);
        setError(err.message || 'Failed to load projects. Please try again.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [isClient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        title: formData.name,
        description: formData.description,
        shortDescription: formData.description.substring(0, 100),
        image: '/images/projects/default.jpg',
        category: 'Default',
        status: 'draft',
        features: formData.features.split('\n').filter(f => f.trim()),
        tokenomics: new Map(
          formData.tokenomics
            .split('\n')
            .filter(t => t.trim())
            .map(t => {
              const [key, value] = t.split(':').map(s => s.trim());
              return [key, value];
            })
        ),
        roadmap: formData.roadmap
          .split('\n')
          .filter(r => r.trim())
          .map(r => {
            const [phase, ...items] = r.split(':').map(s => s.trim());
            return {
              phase,
              items: items.join(':').split(',').map(i => i.trim())
            };
          }),
        team: [],
        socialLinks: {
          website: '',
          twitter: '',
          telegram: '',
          discord: ''
        }
      };

      const url = formData.id 
        ? `/api/projects/${formData.id}`
        : '/api/projects';
      
      const method = formData.id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save project');
      }

      const result = await response.json();
      
      // Refresh projects list
      const projectsResponse = await fetch('/api/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!projectsResponse.ok) {
        const errorData = await projectsResponse.json();
        throw new Error(errorData.error || 'Failed to refresh projects');
      }

      const projectsResult = await projectsResponse.json();
      setProjects(projectsResult.data || []);
      setSuccess(formData.id ? 'Project updated successfully!' : 'Project created successfully!');
      setError('');
      
      // Reset form
      setFormData({
        id: '',
        name: '',
        description: '',
        features: '',
        tokenomics: '',
        roadmap: ''
      });
      setShowForm(false);
    } catch (err) {
      console.error('Error saving project:', err);
      setError('Failed to save project. Please try again.');
      setSuccess('');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete project');
      }

      const result = await response.json();

      // Refresh projects list
      const projectsResponse = await fetch('/api/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!projectsResponse.ok) {
        const errorData = await projectsResponse.json();
        throw new Error(errorData.error || 'Failed to refresh projects');
      }

      const projectsResult = await projectsResponse.json();
      setProjects(projectsResult.data || []);
      setSuccess('Project deleted successfully!');
      setError('');
    } catch (err) {
      console.error('Error deleting project:', err);
      setError('Failed to delete project. Please try again.');
      setSuccess('');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      id: project._id,
      name: project.title,
      description: project.description,
      features: Array.isArray(project.features) ? project.features.join('\n') : '',
      tokenomics: project.tokenomics instanceof Map 
        ? Array.from(project.tokenomics).map(([key, value]) => `${key}: ${value}`).join('\n')
        : '',
      roadmap: Array.isArray(project.roadmap) 
        ? project.roadmap.map(r => `${r.phase}: ${r.items.join(', ')}`).join('\n')
        : ''
    });
    setShowForm(true);
  };

  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase();
    return (
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <AdminLayout>
      <AdminHead title="Projects" description="Manage your projects" />
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>Manage Projects</h1>
          <div className="admin-actions">
            <button 
              className="btn btn-secondary me-2" 
              onClick={async () => {
                try {
                  const response = await fetch('/api/seed', {
                    method: 'POST',
                  });
                  const result = await response.json();
                  
                  if (!result.success) {
                    throw new Error(result.error || 'Failed to seed database');
                  }
                  
                  // Refresh projects list
                  const projectsResponse = await fetch('/api/projects');
                  const projectsResult = await projectsResponse.json();
                  
                  if (!projectsResult.success) {
                    throw new Error(projectsResult.error || 'Failed to refresh projects');
                  }
                  
                  setProjects(projectsResult.data);
                  setSuccess(`Database seeded successfully with ${result.count} projects`);
                  setError('');
                } catch (err) {
                  console.error('Error seeding database:', err);
                  setError('Failed to seed database. Please try again.');
                  setSuccess('');
                }
              }}
            >
              Initialize Sample Data
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => setShowForm(true)}
            >
              <FontAwesomeIcon icon={faPlus} /> Add New Project
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}

        <div className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>

        {loading ? (
          <div className="loading">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="no-data">No projects found. Add your first project.</div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div key={project._id} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.shortDescription || project.description}</p>
                <div className="project-actions">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEdit(project)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(project._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{formData.id ? 'Edit Project' : 'Add New Project'}</h2>
                <button 
                  className="close-btn"
                  onClick={() => setShowForm(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="form-control"
                    rows="4"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Features (one per line)</label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={(e) => setFormData({...formData, features: e.target.value})}
                    className="form-control"
                    rows="4"
                  />
                </div>
                <div className="form-group">
                  <label>Tokenomics (format: category: percentage, one per line)</label>
                  <textarea
                    name="tokenomics"
                    value={formData.tokenomics}
                    onChange={(e) => setFormData({...formData, tokenomics: e.target.value})}
                    className="form-control"
                    rows="4"
                  />
                </div>
                <div className="form-group">
                  <label>Roadmap (format: phase: item1, item2, one phase per line)</label>
                  <textarea
                    name="roadmap"
                    value={formData.roadmap}
                    onChange={(e) => setFormData({...formData, roadmap: e.target.value})}
                    className="form-control"
                    rows="4"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {formData.id ? 'Update Project' : 'Create Project'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <style jsx>{`
          .admin-content {
            padding: 20px;
          }
          .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .search-bar {
            position: relative;
            margin-bottom: 20px;
          }
          .search-icon {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
          }
          .search-bar input {
            padding-left: 35px;
          }
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }
          .project-card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .project-actions {
            display: flex;
            gap: 10px;
            margin-top: 15px;
          }
          .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .modal-content {
            background: white;
            border-radius: 8px;
            padding: 20px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
          }
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          .close-btn {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
          }
          .form-group {
            margin-bottom: 15px;
          }
          .form-actions {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            margin-top: 20px;
          }
          .loading, .no-data {
            text-align: center;
            padding: 40px;
            color: #666;
          }
          .alert {
            margin-bottom: 20px;
            padding: 10px 15px;
            border-radius: 4px;
          }
          .alert-danger {
            background: #fee;
            color: #c00;
            border: 1px solid #fcc;
          }
          .alert-success {
            background: #efe;
            color: #0c0;
            border: 1px solid #cfc;
          }
          .admin-actions {
            display: flex;
            gap: 10px;
            align-items: center;
          }
        `}</style>
      </div>
    </AdminLayout>
  );
};

export default AdminProjects; 