import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple authentication with hardcoded credentials
    if (username === 'admin' && password === 'admin') {
      // Set a session token in localStorage
      localStorage.setItem('adminToken', 'admin-session-token');
      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Planet Sayari Bank</title>
        <meta name="description" content="Admin login for Planet Sayari Bank" />
      </Head>
      
      <div className="admin-login-container">
        <div className="admin-login-box">
          <div className="admin-login-header">
            <h1>Admin Login</h1>
            <p>Please enter your credentials to access the admin panel</p>
          </div>
          
          {error && <div className="admin-error-message">{error}</div>}
          
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="admin-login-button">
              Login
            </button>
          </form>
          
          <div className="admin-login-footer">
            <Link href="/" className="admin-back-link">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .admin-login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f5f5;
        }
        
        .admin-login-box {
          width: 100%;
          max-width: 400px;
          padding: 2rem;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .admin-login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .admin-login-header h1 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: #333;
        }
        
        .admin-login-header p {
          color: #666;
        }
        
        .admin-error-message {
          background-color: #ffebee;
          color: #c62828;
          padding: 0.75rem;
          border-radius: 4px;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .admin-form-group {
          margin-bottom: 1.5rem;
        }
        
        .admin-form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }
        
        .admin-form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        .admin-login-button {
          width: 100%;
          padding: 0.75rem;
          background-color: #1976d2;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .admin-login-button:hover {
          background-color: #1565c0;
        }
        
        .admin-login-footer {
          margin-top: 1.5rem;
          text-align: center;
        }
        
        .admin-login-footer a {
          color: #1976d2;
          text-decoration: none;
        }
        
        .admin-login-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default AdminLogin; 