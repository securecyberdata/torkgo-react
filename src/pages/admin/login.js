import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';

const AdminLogin = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple authentication for demo purposes
    // In a real app, this would be an API call
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminToken', 'demo-token');
        router.push('/admin/dashboard');
      } else {
        setError('Invalid username or password');
        setLoading(false);
      }
    }, 1000);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="admin-login-container">
      <Head>
        <title>Admin Login | Torkgo</title>
        <meta name="description" content="Admin login for Torkgo" />
      </Head>

      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>Torkgo Admin</h1>
          <p>Enter your credentials to access the admin panel</p>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} /> Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} /> Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Demo credentials: admin / admin123</p>
        </div>
      </div>

      <style jsx>{`
        .admin-login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f5f5;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .admin-login-card {
          width: 100%;
          max-width: 400px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        .admin-login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .admin-login-header h1 {
          color: #1a1a1a;
          margin-bottom: 0.5rem;
          font-size: 1.75rem;
        }

        .admin-login-header p {
          color: #666;
          font-size: 0.875rem;
        }

        .admin-login-error {
          background-color: #ffebee;
          color: #c62828;
          padding: 0.75rem;
          border-radius: 4px;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }

        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .admin-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .admin-form-group label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #333;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .admin-form-group input {
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.875rem;
          transition: border-color 0.2s ease;
        }

        .admin-form-group input:focus {
          border-color: #4a9eff;
          outline: none;
        }

        .admin-login-button {
          background-color: #4a9eff;
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 4px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background-color 0.2s ease;
          margin-top: 0.5rem;
        }

        .admin-login-button:hover {
          background-color: #3a8eef;
        }

        .admin-login-button:disabled {
          background-color: #a0c7ff;
          cursor: not-allowed;
        }

        .admin-login-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.75rem;
          color: #999;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin; 