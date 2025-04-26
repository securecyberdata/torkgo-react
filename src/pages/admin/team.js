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
import { fetchData } from '@/apiConfig';

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
    img: '',
    description: '',
    expertise: [],
    social: {
      twitter: '',
      linkedin: '',
      facebook: '',
      instagram: ''
    }
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

    // Load team members from API
    const loadTeamMembers = async () => {
      try {
        const response = await fetch('/api/team', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }

        const data = await response.json();
        setTeamMembers(data);
      } catch (err) {
        console.error('Error loading team members:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchData('/team', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setTeamMembers([...teamMembers, response]);
      setShowForm(false);
      setFormData({
        name: '',
        role: '',
        bio: '',
        img: '',
        description: '',
        expertise: [],
        social: {
          twitter: '',
          linkedin: '',
          facebook: '',
          instagram: ''
        }
      });
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await fetchData(`/team/${id}`, {
          method: 'DELETE'
        });
        setTeamMembers(teamMembers.filter(member => member._id !== id));
      } catch (error) {
        console.error('Error deleting team member:', error);
      }
    }
  };

  const handleEdit = async (member) => {
    try {
      const response = await fetchData(`/team/${member._id}`, {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      setTeamMembers(teamMembers.map(m => m._id === member._id ? response : m));
      setShowForm(false);
      setFormData({
        name: '',
        role: '',
        bio: '',
        img: '',
        description: '',
        expertise: [],
        social: {
          twitter: '',
          linkedin: '',
          facebook: '',
          instagram: ''
        }
      });
    } catch (error) {
      console.error('Error updating team member:', error);
    }
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
              <h2>{formData._id ? 'Edit Team Member' : 'Add New Team Member'}</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({
                    name: '',
                    role: '',
                    bio: '',
                    img: '',
                    description: '',
                    expertise: [],
                    social: {
                      twitter: '',
                      linkedin: '',
                      facebook: '',
                      instagram: ''
                    }
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
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="img">Image URL</label>
                <input
                  type="text"
                  id="img"
                  name="img"
                  value={formData.img}
                  onChange={(e) => setFormData({ ...formData, img: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="expertise">Expertise (comma separated)</label>
                <input
                  type="text"
                  id="expertise"
                  name="expertise"
                  value={formData.expertise.join(', ')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    expertise: e.target.value.split(',').map(item => item.trim())
                  })}
                  placeholder="Expertise 1, Expertise 2, Expertise 3"
                />
              </div>

              <div className="form-group">
                <label>Social Links</label>
                <div className="social-inputs">
                  <input
                    type="text"
                    placeholder="Twitter URL"
                    value={formData.social.twitter}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      social: { ...formData.social, twitter: e.target.value }
                    })}
                  />
                  <input
                    type="text"
                    placeholder="LinkedIn URL"
                    value={formData.social.linkedin}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      social: { ...formData.social, linkedin: e.target.value }
                    })}
                  />
                  <input
                    type="text"
                    placeholder="Facebook URL"
                    value={formData.social.facebook}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      social: { ...formData.social, facebook: e.target.value }
                    })}
                  />
                  <input
                    type="text"
                    placeholder="Instagram URL"
                    value={formData.social.instagram}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      social: { ...formData.social, instagram: e.target.value }
                    })}
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="submit-button">
                  {formData._id ? 'Update Team Member' : 'Add Team Member'}
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
                      img: '',
                      description: '',
                      expertise: [],
                      social: {
                        twitter: '',
                        linkedin: '',
                        facebook: '',
                        instagram: ''
                      }
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
            {filteredTeamMembers.length > 0 ? (
              filteredTeamMembers.map((member) => (
                <div key={member._id} className="team-card">
                  <div className="team-card-image">
                    {member.img ? (
                      <img src={member.img} alt={member.name} />
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
                      onClick={() => {
                        setFormData(member);
                        setShowForm(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDelete(member._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No team members found. {searchTerm && 'Try a different search term.'}</p>
                {!searchTerm && (
                  <button 
                    className="add-button"
                    onClick={() => setShowForm(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add Your First Team Member
                  </button>
                )}
              </div>
            )}
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
        
        .social-inputs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
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
        
        .no-results {
          text-align: center;
          padding: 2rem;
          color: #666;
        }
        
        .no-results p {
          margin-bottom: 1rem;
        }
      `}</style>
    </AdminLayout>
  );
};

export default TeamManagement; 