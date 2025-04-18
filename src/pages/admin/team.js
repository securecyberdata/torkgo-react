import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for team members
const initialTeamMembers = [
  {
    id: 1,
    name: 'Michael Wilkinson',
    role: 'CEO & Founder',
    image: '/images/team/michael.jpg',
    bio: 'Experienced leader in financial technology and banking solutions.',
    description: 'Michael has over 15 years of experience in fintech and banking.',
    expertise: ['Leadership', 'FinTech', 'Banking'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/michael-wilkinson',
      twitter: 'https://twitter.com/michaelwilkinson'
    }
  },
  {
    id: 2,
    name: 'Duncan Oduor Otieno',
    role: 'CTO',
    image: '/images/team/duncan.jpg',
    bio: 'Technology innovator with expertise in blockchain and AI.',
    description: 'Duncan leads our technical initiatives and innovation strategy.',
    expertise: ['Blockchain', 'AI', 'Software Architecture'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/duncan-otieno',
      twitter: 'https://twitter.com/duncannotieno'
    }
  },
  {
    id: 3,
    name: 'Dr. Shermaine',
    role: 'Chief Medical Officer',
    image: '/images/team/shermaine.jpg',
    bio: 'Medical expert with a focus on healthcare innovation.',
    description: 'Dr. Shermaine brings extensive experience in medical research and healthcare technology.',
    expertise: ['Healthcare', 'Medical Research', 'Innovation'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/dr-shermaine',
      twitter: 'https://twitter.com/drshermaine'
    }
  },
  {
    id: 4,
    name: 'Michele',
    role: 'Marketing Director',
    image: '/images/team/michele.jpg',
    bio: 'Creative marketing strategist with a passion for brand development.',
    description: 'Michele has led successful marketing campaigns for numerous fintech companies.',
    expertise: ['Marketing', 'Brand Strategy', 'Digital Media'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/michele',
      twitter: 'https://twitter.com/michele'
    }
  },
  {
    id: 5,
    name: 'John Smith',
    role: 'Financial Advisor',
    image: '/images/team/john.jpg',
    bio: 'Financial expert specializing in investment strategies.',
    description: 'John has advised numerous high-profile clients on investment opportunities.',
    expertise: ['Finance', 'Investment', 'Risk Management'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johnsmith',
      twitter: 'https://twitter.com/johnsmith'
    }
  },
  {
    id: 6,
    name: 'Sarah Johnson',
    role: 'Head of Operations',
    image: '/images/team/sarah.jpg',
    bio: 'Operations specialist with a focus on efficiency and scalability.',
    description: 'Sarah has optimized operations for several growing fintech companies.',
    expertise: ['Operations', 'Process Optimization', 'Team Management'],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson'
    }
  }
];

const TeamManagement = () => {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: '',
    bio: '',
    description: '',
    expertise: '',
    linkedin: '',
    twitter: ''
  });

  // Check if user is authenticated
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin');
    }
  }, [router]);

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
      twitter: ''
    });
  };

  const handleEditMember = (member) => {
    setIsEditingMember(true);
    setCurrentMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      image: member.image,
      bio: member.bio,
      description: member.description,
      expertise: member.expertise.join(', '),
      linkedin: member.socialLinks.linkedin || '',
      twitter: member.socialLinks.twitter || ''
    });
  };

  const handleDeleteMember = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const memberData = {
      name: formData.name,
      role: formData.role,
      image: formData.image,
      bio: formData.bio,
      description: formData.description,
      expertise: formData.expertise.split(',').map(item => item.trim()),
      socialLinks: {
        linkedin: formData.linkedin,
        twitter: formData.twitter
      }
    };
    
    if (isAddingMember) {
      // Add new member
      const newMember = {
        id: teamMembers.length > 0 ? Math.max(...teamMembers.map(m => m.id)) + 1 : 1,
        ...memberData
      };
      setTeamMembers([...teamMembers, newMember]);
      setIsAddingMember(false);
    } else if (isEditingMember) {
      // Update existing member
      setTeamMembers(teamMembers.map(member => 
        member.id === currentMember.id ? { ...member, ...memberData } : member
      ));
      setIsEditingMember(false);
      setCurrentMember(null);
    }
  };

  const handleCancel = () => {
    setIsAddingMember(false);
    setIsEditingMember(false);
    setCurrentMember(null);
  };

  return (
    <>
      <Head>
        <title>Team Management | Admin Dashboard</title>
        <meta name="description" content="Manage team members for Planet Sayari Bank" />
      </Head>
      
      <div className="admin-page">
        <header className="admin-header">
          <div className="admin-header-content">
            <h1>Team Management</h1>
            <Link href="/admin/dashboard" className="admin-back-link">
              Back to Dashboard
            </Link>
          </div>
        </header>
        
        <div className="admin-container">
          <div className="admin-content">
            <div className="admin-actions">
              <button 
                className="admin-button" 
                onClick={handleAddMember}
                disabled={isAddingMember || isEditingMember}
              >
                Add New Team Member
              </button>
            </div>
            
            {(isAddingMember || isEditingMember) && (
              <div className="admin-form-container">
                <h2>{isAddingMember ? 'Add New Team Member' : 'Edit Team Member'}</h2>
                <form onSubmit={handleSubmit} className="admin-form">
                  <div className="admin-form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="role">Role</label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="image">Image Path</label>
                    <input
                      type="text"
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                      placeholder="/images/team/member.jpg"
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="bio">Short Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      required
                      rows="3"
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="description">Full Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="4"
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="expertise">Areas of Expertise (comma-separated)</label>
                    <input
                      type="text"
                      id="expertise"
                      name="expertise"
                      value={formData.expertise}
                      onChange={handleInputChange}
                      required
                      placeholder="Leadership, FinTech, Banking"
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="linkedin">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  
                  <div className="admin-form-group">
                    <label htmlFor="twitter">Twitter Profile URL</label>
                    <input
                      type="url"
                      id="twitter"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  
                  <div className="admin-form-actions">
                    <button type="submit" className="admin-button">
                      {isAddingMember ? 'Add Member' : 'Update Member'}
                    </button>
                    <button 
                      type="button" 
                      className="admin-button admin-button-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="admin-table-container">
              <h2>Team Members List</h2>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Expertise</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map(member => (
                    <tr key={member.id}>
                      <td>{member.id}</td>
                      <td>
                        <div className="admin-image-container">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={50}
                            height={50}
                            className="admin-member-image"
                          />
                        </div>
                      </td>
                      <td>{member.name}</td>
                      <td>{member.role}</td>
                      <td>{member.expertise.join(', ')}</td>
                      <td className="admin-table-actions">
                        <button 
                          className="admin-button admin-button-small"
                          onClick={() => handleEditMember(member)}
                        >
                          Edit
                        </button>
                        <button 
                          className="admin-button admin-button-small admin-button-danger"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          Delete
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
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .admin-header {
          background-color: #1976d2;
          color: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .admin-header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .admin-header h1 {
          margin: 0;
          font-size: 1.5rem;
        }
        
        .admin-back-link {
          color: white;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border: 1px solid white;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .admin-back-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .admin-container {
          flex: 1;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          padding: 2rem;
        }
        
        .admin-content {
          background-color: white;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .admin-actions {
          margin-bottom: 2rem;
        }
        
        .admin-button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background-color: #1976d2;
          color: white;
          border: none;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .admin-button:hover {
          background-color: #1565c0;
        }
        
        .admin-button:disabled {
          background-color: #bdbdbd;
          cursor: not-allowed;
        }
        
        .admin-button-secondary {
          background-color: #f5f5f5;
          color: #333;
          border: 1px solid #ddd;
        }
        
        .admin-button-secondary:hover {
          background-color: #e0e0e0;
        }
        
        .admin-button-danger {
          background-color: #f44336;
        }
        
        .admin-button-danger:hover {
          background-color: #d32f2f;
        }
        
        .admin-button-small {
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        }
        
        .admin-form-container {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background-color: #f9f9f9;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }
        
        .admin-form-container h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #333;
        }
        
        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .admin-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .admin-form-group label {
          font-weight: 500;
          color: #333;
        }
        
        .admin-form-group input,
        .admin-form-group select,
        .admin-form-group textarea {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .admin-form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .admin-table-container {
          margin-top: 2rem;
        }
        
        .admin-table-container h2 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #333;
        }
        
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .admin-table th,
        .admin-table td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .admin-table th {
          background-color: #f5f5f5;
          font-weight: 500;
        }
        
        .admin-table-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .admin-image-container {
          width: 50px;
          height: 50px;
          position: relative;
          border-radius: 50%;
          overflow: hidden;
        }
        
        .admin-member-image {
          object-fit: cover;
        }
      `}</style>
    </>
  );
};

export default TeamManagement; 