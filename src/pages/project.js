
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/base/PageHeader';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const result = await response.json();
        if (result.success) {
          setProjects(result.data);
        } else {
          setError('Failed to fetch projects');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Error loading projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Projects - Planet Sayari Bank</title>
        <meta name="description" content="Explore our current and upcoming projects" />
      </Head>

      <PageHeader title="Projects" text="Discover our current and upcoming projects" />

      <section className="project-section padding-top padding-bottom">
        <div className="container">
          {loading ? (
            <div className="loading-message">Loading projects...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : projects.length === 0 ? (
            <div className="no-projects">No projects found</div>
          ) : (
            <div className="project-wrapper">
              <div className="row g-4">
                {projects.map((project) => (
                  <div key={project._id} className="col-12 col-lg-4 col-md-6">
                    <div className="project-card">
                      <div className="project-card__thumb">
                        <Image
                          src={project.image || '/images/igo/item/01.jpg'}
                          alt={project.title}
                          width={400}
                          height={300}
                          className="project-image"
                        />
                      </div>
                      <div className="project-card__content">
                        <h3>{project.title}</h3>
                        <p className="project-description">
                          {project.shortDescription || project.description?.substring(0, 150)}...
                        </p>
                        <div className="project-stats">
                          {project.tokenomics?.distribution?.map((item, index) => (
                            <div key={index} className="stat-item">
                              <span className="stat-label">{item.category}</span>
                              <span className="stat-value">{item.percentage}%</span>
                            </div>
                          ))}
                        </div>
                        <Link href={`/projectdetails/${project._id}`} className="default-btn small-btn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .loading-message, .error-message, .no-projects {
          text-align: center;
          padding: 40px;
          font-size: 1.2rem;
          color: var(--body-color);
        }
        .error-message {
          color: #dc3545;
        }
        .project-card {
          background: var(--card-bg);
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          height: 100%;
        }
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        }
        .project-card__content {
          padding: 20px;
        }
        .project-description {
          color: var(--body-color);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .project-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 10px;
          margin-bottom: 1.5rem;
        }
        .stat-item {
          text-align: center;
          padding: 0.5rem;
          background: var(--card-bg-secondary);
          border-radius: 5px;
        }
        .stat-label {
          display: block;
          font-size: 0.8rem;
          color: var(--body-color);
          margin-bottom: 0.25rem;
        }
        .stat-value {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          color: var(--heading-color);
        }
      `}</style>
    </Layout>
  );
};

export default Project;
