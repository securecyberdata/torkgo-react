import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { projects as defaultProjects } from '@/data/projectData';
import PageHeader from '@/components/base/PageHeader';

const Project2 = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load projects from localStorage first
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      try {
        const parsedProjects = JSON.parse(storedProjects);
        if (Array.isArray(parsedProjects)) {
          setProjects(parsedProjects);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error('Error parsing stored projects:', e);
      }
    }

    // If no stored projects, use default projects
    setProjects(defaultProjects);
    setLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Projects - Planet Sayari Bank</title>
        <meta name="description" content="Explore our current and upcoming projects" />
      </Head>

      <PageHeader title="Projects" text="Discover our current and upcoming projects" />

      <section className="projects-section padding-top padding-bottom">
        <div className="container">
          {loading ? (
            <div className="loading-message">Loading projects...</div>
          ) : (
            <div className="row g-4">
              {projects.map((project) => (
                <div key={project.id} className="col-lg-4 col-md-6">
                  <div className="project-card">
                    <div className="project-card__image">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="project-card__content">
                      <h3>{project.title}</h3>
                      <p className="project-symbol">{project.symbol}</p>
                      <p className="project-description">{project.shortDescription}</p>
                      <div className="project-stats">
                        <div className="stat-item">
                          <span className="stat-label">Price</span>
                          <span className="stat-value">{project.idoPrice}</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Hard Cap</span>
                          <span className="stat-value">{project.hardCap}</span>
                        </div>
                      </div>
                      <Link href={`/projectdetails/${project.id}`} className="default-btn">
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .project-section {
          padding: 80px 0;
          background-color: var(--body-bg);
        }

        .loading-message {
          text-align: center;
          padding: 40px;
          font-size: 1.2rem;
          color: var(--body-color);
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--heading-color);
        }

        .section-header p {
          font-size: 1.1rem;
          color: var(--body-color);
          max-width: 600px;
          margin: 0 auto;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .project-card {
          background: var(--card-bg);
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        }

        .project-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.05);
        }

        .project-content {
          padding: 20px;
        }

        .project-title {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--heading-color);
        }

        .project-symbol {
          font-size: 0.9rem;
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .project-description {
          color: var(--body-color);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .project-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .detail-item {
          text-align: center;
          padding: 0.5rem;
          background: var(--card-bg-secondary);
          border-radius: 5px;
        }

        .detail-item .label {
          display: block;
          font-size: 0.8rem;
          color: var(--body-color);
          margin-bottom: 0.25rem;
        }

        .detail-item .value {
          display: block;
          font-size: 1rem;
          font-weight: 600;
          color: var(--heading-color);
        }

        .project-link {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background-color: var(--primary-color);
          color: white;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
          text-align: center;
          width: 100%;
        }

        .project-link:hover {
          background-color: var(--primary-color-dark);
        }

        @media (max-width: 768px) {
          .project-grid {
            grid-template-columns: 1fr;
          }

          .section-header h2 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
};

export default Project2;
