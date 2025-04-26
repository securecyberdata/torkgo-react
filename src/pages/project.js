import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import PageHeader from '@/components/base/PageHeader';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.data || []);
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
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Project;