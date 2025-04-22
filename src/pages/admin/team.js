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

const TeamManagement = () => {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: ''
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if user is authenticated
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }

    // Load team members from localStorage
    const loadTeamMembers = () => {
      try {
        const storedTeamMembers = JSON.parse(localStorage.getItem('teamMembers') || '[]');
        setTeamMembers(storedTeamMembers);
      } catch (err) {
        console.error('Error loading team members:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeamMember = {
      id: Date.now().toString(),
      ...formData
    };

    const updatedTeamMembers = [...teamMembers, newTeamMember];
    setTeamMembers(updatedTeamMembers);
    localStorage.setItem('teamMembers', JSON.stringify(updatedTeamMembers));
    setShowForm(false);
    setFormData({
      name: '',
      role: '',
      bio: '',
      image: ''
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      const updatedTeamMembers = teamMembers.filter(member => member.id !== id);
      setTeamMembers(updatedTeamMembers);
      localStorage.setItem('teamMembers', JSON.stringify(updatedTeamMembers));
    }
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image
    });
    setShowForm(true);
  };

  const filteredTeamMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isClient) {
    return null;
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading">Loading team members...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminHead title="Team Management" description="Manage your team members" />
      
      <div className="admin-content">
        <div className="admin-header">
          <h1>Team Management</h1>
          <button 
            className="add-button"
            onClick={() => setShowForm(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add Team Member
          </button>
        </div>

        <div className="search-bar">
          <div className="search-input">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {showForm && (
          <div className="form-container">
            <div className="form-header">
              <h2>{formData.id ? 'Edit Team Member' : 'Add New Team Member'}</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({
                    name: '',
                    role: '',
                    bio: '',
                    image: ''
                  });
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows="4"
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
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-button">
                  {formData.id ? 'Update Team Member' : 'Add Team Member'}
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      name: '',
                      role: '',
                      bio: '',
                      image: ''
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading team members...</div>
        ) : (
          <div className="team-grid">
            {filteredTeamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="team-card-image">
                  {member.image ? (
                    <img src={member.image} alt={member.name} />
                  ) : (
                    <div className="placeholder-image">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="team-card-content">
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p className="bio">{member.bio}</p>
                </div>
                <div className="team-card-actions">
                  <button 
                    className="edit-button"
                    onClick={() => handleEdit(member)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => handleDelete(member.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-content {
          padding: 2rem;
        }
        
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .admin-header h1 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        
        .add-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }
        
        .add-button:hover {
          background-color: #45a049;
        }
        
        .search-bar {
          margin-bottom: 2rem;
        }
        
        .search-input {
          display: flex;
          align-items: center;
          background-color: #f5f5f5;
          border-radius: 4px;
          padding: 0.5rem 1rem;
          width: 100%;
          max-width: 400px;
        }
        
        .search-input input {
          border: none;
          background: transparent;
          margin-left: 0.5rem;
          width: 100%;
          outline: none;
          font-size: 1rem;
        }
        
        .form-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          margin-bottom: 2rem;
        }
        
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .form-header h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin: 0;
        }
        
        .close-button {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          font-size: 1.2rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .submit-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        
        .submit-button:hover {
          background-color: #45a049;
        }
        
        .cancel-button {
          background-color: #f5f5f5;
          color: #333;
          border: 1px solid #ddd;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        
        .cancel-button:hover {
          background-color: #e9e9e9;
        }
        
        .loading {
          text-align: center;
          padding: 2rem;
          color: #666;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .team-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.2s;
        }
        
        .team-card:hover {
          transform: translateY(-5px);
        }
        
        .team-card-image {
          height: 200px;
          overflow: hidden;
          background-color: #f5f5f5;
        }
        
        .team-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .placeholder-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-weight: 600;
          color: #666;
          background-color: #f5f5f5;
        }
        
        .team-card-content {
          padding: 1.5rem;
        }
        
        .team-card-content h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          margin: 0 0 0.5rem 0;
        }
        
        .team-card-content .role {
          font-size: 0.9rem;
          color: #666;
          margin: 0 0 1rem 0;
        }
        
        .team-card-content .bio {
          font-size: 0.9rem;
          color: #333;
          margin: 0;
          line-height: 1.5;
        }
        
        .team-card-actions {
          display: flex;
          padding: 1rem 1.5rem;
          border-top: 1px solid #eee;
          gap: 0.5rem;
        }
        
        .edit-button,
        .delete-button {
          flex: 1;
          padding: 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        
        .edit-button {
          background-color: #2196F3;
          color: white;
        }
        
        .edit-button:hover {
          background-color: #0b7dda;
        }
        
        .delete-button {
          background-color: #f44336;
          color: white;
        }
        
        .delete-button:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </AdminLayout>
  );
};

export default TeamManagement; 