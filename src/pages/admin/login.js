import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import AdminHead from '@/components/admin/AdminHead';

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
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
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
      <AdminHead title="Login" description="Admin login page" />

      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>Admin Login</h1>
          <p>Enter your credentials to access the admin panel</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} />
              <span>Username</span>
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

          <div className="form-group">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} />
              <span>Password</span>
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

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                <span>Logging in...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Demo credentials: admin / admin123</p>
        </div>
      </div>

      <style jsx>{`
        .admin-login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8f9fa;
          padding: 1rem;
        }

        .admin-login-card {
          width: 100%;
          max-width: 400px;
          background-color: white;
          border-radius: 0.5rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .admin-login-header {
          padding: 1.5rem;
          text-align: center;
          background-color: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
        }

        .admin-login-header h1 {
          font-size: 1.5rem;
          color: #212529;
          margin: 0 0 0.5rem 0;
        }

        .admin-login-header p {
          color: #6c757d;
          margin: 0;
          font-size: 0.875rem;
        }

        .error-message {
          background-color: #f8d7da;
          color: #842029;
          padding: 0.75rem;
          margin: 1rem;
          border-radius: 0.375rem;
          font-size: 0.875rem;
        }

        .admin-login-form {
          padding: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: #495057;
          font-size: 0.875rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          border: 1px solid #dee2e6;
          border-radius: 0.375rem;
          transition: border-color 0.15s ease-in-out;
        }

        .form-group input:focus {
          outline: none;
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }

        .login-button {
          width: 100%;
          padding: 0.5rem 1rem;
          background-color: #0d6efd;
          color: white;
          border: none;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background-color 0.15s ease-in-out;
        }

        .login-button:hover:not(:disabled) {
          background-color: #0b5ed7;
        }

        .login-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .admin-login-footer {
          padding: 1rem;
          text-align: center;
          background-color: #f8f9fa;
          border-top: 1px solid #dee2e6;
        }

        .admin-login-footer p {
          color: #6c757d;
          margin: 0;
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin; 