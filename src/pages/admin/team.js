import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { fetchData } from '@/apiConfig';
import { teamMembers as defaultTeamMembers } from '@/data/teamData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faTimes, faSave, faArrowLeft, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import AdminLayout from '@/components/admin/AdminLayout';

const TeamManagement = () => {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState([]);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    bio: '',
    description: '',
    expertise: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: ''
  });

  // Check if user is authenticated and fetch team data
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin');
      return;
    }

    // Fetch team members from localStorage
    const fetchTeamMembers = () => {
      try {
        console.log('Fetching team members for admin panel...');
        const storedMembers = localStorage.getItem('teamMembers');
        
        if (storedMembers) {
          try {
            const parsedMembers = JSON.parse(storedMembers);
            console.log('Found team members in localStorage:', parsedMembers);
            if (Array.isArray(parsedMembers) && parsedMembers.length > 0) {
              setTeamMembers(parsedMembers);
              setLoading(false);
              return;
            }
          } catch (parseError) {
            console.error('Error parsing stored team members:', parseError);
            localStorage.removeItem('teamMembers'); // Clear invalid data
          }
        }
        
        // If no localStorage data or invalid data, use default team members
        console.log('Using default team members');
        setTeamMembers(defaultTeamMembers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setError('Failed to load team members');
        setTeamMembers(defaultTeamMembers);
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, [router]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddMember = () => {
    setIsAddingMember(true);
    setFormData({
      name: '',
      role: '',
      image: '',
      bio: '',
      description: '',
      expertise: '',
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    });
  };

  const handleEditMember = (member) => {
    setIsEditingMember(true);
    setCurrentMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      image: member.image || member.img || '',
      bio: member.bio || '',
      description: member.description || '',
      expertise: Array.isArray(member.expertise) ? member.expertise.join(', ') : '',
      linkedin: member.socialLinks?.linkedin || member.social?.linkedin || '',
      twitter: member.socialLinks?.twitter || member.social?.twitter || '',
      facebook: member.socialLinks?.facebook || member.social?.facebook || '',
      instagram: member.socialLinks?.instagram || member.social?.instagram || ''
    });
  };

  const handleDeleteMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update local state
        const updatedMembers = teamMembers.filter(member => member.id !== id);
        setTeamMembers(updatedMembers);
        
        // Store in localStorage
        localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
        
        // Store timestamp for recent activity
        localStorage.setItem('teamMembersLastUpdated', Date.now().toString());
        
        setSuccessMessage('Team member deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Error deleting team member:', error);
        setError('Failed to delete team member');
        setTimeout(() => setError(''), 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let updatedMembers;
      
      if (currentMember) {
        // Update existing member
        updatedMembers = teamMembers.map(member => 
          member.id === currentMember.id 
            ? { 
                ...member, 
                name: formData.name,
                role: formData.role,
                image: formData.image,
                bio: formData.bio,
                description: formData.description,
                expertise: formData.expertise.split(',').map(item => item.trim()),
                social: {
                  ...member.social,
                  linkedin: formData.linkedin,
                  twitter: formData.twitter,
                  facebook: formData.facebook,
                  instagram: formData.instagram
                }
              }
            : member
        );
      } else {
        // Add new member
        const newMember = {
          id: uuidv4(), // Generate a unique ID using UUID
          name: formData.name,
          role: formData.role,
          image: formData.image,
          bio: formData.bio,
          description: formData.description,
          expertise: formData.expertise.split(',').map(item => item.trim()),
          social: {
            linkedin: formData.linkedin,
            twitter: formData.twitter,
            facebook: formData.facebook,
            instagram: formData.instagram
          }
        };
        updatedMembers = [...teamMembers, newMember];
      }
      
      // Update state
      setTeamMembers(updatedMembers);
      
      // Store in localStorage
      localStorage.setItem('teamMembers', JSON.stringify(updatedMembers));
      
      // Store timestamp for recent activity
      localStorage.setItem('teamMembersLastUpdated', Date.now().toString());
      
      // Reset form
      setFormData({
        name: '',
        role: '',
        image: '',
        bio: '',
        description: '',
        expertise: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: ''
      });
      setIsAddingMember(false);
      setIsEditingMember(false);
      setCurrentMember(null);
      
      setSuccessMessage(`Team member ${currentMember ? 'updated' : 'added'} successfully`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving team member:', error);
      setError(`Failed to ${currentMember ? 'update' : 'add'} team member`);
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsAddingMember(false);
    setIsEditingMember(false);
    setCurrentMember(null);
  };

  // If we have team members but still showing loading, update the state
  useEffect(() => {
    if (teamMembers.length > 0 && loading) {
      setLoading(false);
    }
  }, [teamMembers, loading]);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading team members...</h2>
        <style jsx>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 50vh;
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <AdminLayout>
      <Head>
        <title>Team Management | Admin | Torkgo</title>
        <meta name="description" content="Manage team members for Torkgo" />
      </Head>
      
      <div className="admin-page">
        <header className="admin-header">
          <div className="admin-header-content">
            <h1><FontAwesomeIcon icon={faUsers} className="header-icon" /> Team Management</h1>
            <Link href="/admin/dashboard" className="admin-back-link">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
            </Link>
          </div>
        </header>
        
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        
        <div className="admin-container">
          <div className="admin-content">
            <div className="admin-actions">
              <button 
                className="admin-button add-button" 
                onClick={handleAddMember}
                disabled={isAddingMember || isEditingMember}
              >
                <FontAwesomeIcon icon={faUserPlus} /> Add New Team Member
              </button>
            </div>
            
            {(isAddingMember || isEditingMember) && (
              <div className="admin-form-container">
                <h2>
                  {isAddingMember ? (
                    <><FontAwesomeIcon icon={faUserPlus} /> Add New Team Member</>
                  ) : (
                    <><FontAwesomeIcon icon={faEdit} /> Edit Team Member</>
                  )}
                </h2>
                <form onSubmit={handleSubmit} className="admin-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter role (e.g. CEO, CTO)"
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
                      placeholder="/images/team/member.jpg"
                    />
                    {formData.image && (
                      <div className="image-preview">
                        <Image
                          src={formData.image}
                          alt="Preview"
                          width={100}
                          height={100}
                          className="preview-image"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="bio">Short Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows="3"
                      required
                      placeholder="Enter a short bio"
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="description">Full Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="5"
                      required
                      placeholder="Enter a detailed description"
                    ></textarea>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="expertise">Expertise (comma-separated)</label>
                    <input
                      type="text"
                      id="expertise"
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleInputChange}
                      placeholder="Leadership, FinTech, Banking"
                    />
                  </div>
                  
                  <div className="form-group social-links">
                    <label>Social Links</label>
                    <div className="social-input-group">
                      <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="LinkedIn URL"
                      />
                    </div>
                    <div className="social-input-group">
                      <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                      <input
                        type="url"
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        placeholder="Twitter URL"
                      />
                    </div>
                    <div className="social-input-group">
                      <FontAwesomeIcon icon={faFacebook} className="social-icon" />
                      <input
                        type="url"
                        id="facebook"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleInputChange}
                        placeholder="Facebook URL"
                      />
                    </div>
                    <div className="social-input-group">
                      <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                      <input
                        type="url"
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        placeholder="Instagram URL"
                      />
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className="admin-button save-button"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : (
                        <><FontAwesomeIcon icon={faSave} /> {isAddingMember ? 'Add Member' : 'Update Member'}</>
                      )}
                    </button>
                    <button 
                      type="button" 
                      className="admin-button admin-button-secondary"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      <FontAwesomeIcon icon={faTimes} /> Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="admin-table-container">
              <h2><FontAwesomeIcon icon={faUsers} /> Team Members ({teamMembers.length})</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Bio</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>
                        <div className="member-image">
                          <Image
                            src={member.image || member.img || '/images/placeholder.jpg'}
                            alt={member.name}
                            width={50}
                            height={50}
                            className="member-thumbnail"
                          />
                        </div>
                      </td>
                      <td>{member.name}</td>
                      <td>{member.role}</td>
                      <td className="bio-cell">{member.bio}</td>
                      <td className="action-buttons">
                        <button
                          className="admin-button admin-button-small edit-button"
                          onClick={() => handleEditMember(member)}
                          title="Edit member"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="admin-button admin-button-small admin-button-danger delete-button"
                          onClick={() => handleDeleteMember(member.id)}
                          title="Delete member"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .admin-page {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .admin-header {
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        
        .admin-header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .admin-header h1 {
          margin: 0;
          font-size: 2rem;
          color: var(--color-primary);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .header-icon {
          color: var(--color-primary);
        }
        
        .admin-back-link {
          color: var(--color-primary);
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 15px;
          border-radius: 4px;
          background-color: rgba(25, 118, 210, 0.1);
          transition: all 0.3s ease;
        }
        
        .admin-back-link:hover {
          background-color: rgba(25, 118, 210, 0.2);
        }
        
        .admin-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        .admin-content {
          padding: 20px;
        }
        
        .admin-actions {
          margin-bottom: 20px;
        }
        
        .admin-button {
          background-color: var(--color-primary);
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .admin-button:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .admin-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .add-button {
          background-color: #4caf50;
        }
        
        .add-button:hover {
          background-color: #388e3c;
        }
        
        .save-button {
          background-color: #2196f3;
        }
        
        .save-button:hover {
          background-color: #1976d2;
        }
        
        .admin-button-secondary {
          background-color: #6c757d;
        }
        
        .admin-button-secondary:hover {
          background-color: #5a6268;
        }
        
        .admin-button-danger {
          background-color: #dc3545;
        }
        
        .admin-button-danger:hover {
          background-color: #c82333;
        }
        
        .admin-button-small {
          padding: 8px;
          font-size: 0.875rem;
          margin-right: 5px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .edit-button {
          background-color: #ff9800;
        }
        
        .edit-button:hover {
          background-color: #f57c00;
        }
        
        .delete-button {
          background-color: #f44336;
        }
        
        .delete-button:hover {
          background-color: #d32f2f;
        }
        
        .admin-form-container {
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .admin-form-container h2 {
          margin-top: 0;
          margin-bottom: 20px;
          color: var(--color-primary);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .admin-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #333;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          border-color: var(--color-primary);
          outline: none;
          box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
        }
        
        .form-group textarea {
          resize: vertical;
        }
        
        .image-preview {
          margin-top: 10px;
          border-radius: 4px;
          overflow: hidden;
          width: 100px;
          height: 100px;
          border: 1px solid #ddd;
        }
        
        .preview-image {
          object-fit: cover;
        }
        
        .social-links {
          grid-column: 1 / -1;
        }
        
        .social-input-group {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .social-icon {
          width: 20px;
          margin-right: 10px;
          color: #666;
        }
        
        .form-actions {
          grid-column: 1 / -1;
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 20px;
        }
        
        .admin-table-container {
          overflow-x: auto;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          padding: 20px;
        }
        
        .admin-table-container h2 {
          margin-top: 0;
          margin-bottom: 20px;
          color: var(--color-primary);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .admin-table th,
        .admin-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        .admin-table th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #333;
        }
        
        .admin-table tr:hover {
          background-color: #f5f5f5;
        }
        
        .member-image {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #eee;
        }
        
        .member-thumbnail {
          object-fit: cover;
        }
        
        .bio-cell {
          max-width: 300px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .action-buttons {
          display: flex;
          gap: 5px;
        }
        
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          text-align: center;
          padding: 20px;
          color: var(--color-error);
        }
        
        .retry-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }
        
        .retry-button:hover {
          background-color: var(--color-primary-dark);
        }
        
        .success-message {
          background-color: #4caf50;
          color: white;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
          .admin-form {
            grid-template-columns: 1fr;
          }
          
          .admin-header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          
          .bio-cell {
            max-width: 150px;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default TeamManagement; 