import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { projects as defaultProjects } from '@/data/projectData';
import PageHeader from '@/components/base/PageHeader';

const ProjectDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchProject = () => {
      try {
        // First try to get from localStorage
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
          const parsedProjects = JSON.parse(storedProjects);
          // Convert both IDs to strings for comparison
          const foundProject = parsedProjects.find(p => String(p.id) === String(id));
          if (foundProject) {
            setProject(foundProject);
            setLoading(false);
            return;
          }
        }

        // If not found in localStorage, check default projects
        const defaultProject = defaultProjects.find(p => String(p.id) === String(id));
        if (defaultProject) {
          setProject(defaultProject);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Error loading project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Helper function to safely render feature content
  const renderFeature = (feature) => {
    if (typeof feature === 'string') {
      return feature;
    }
    if (typeof feature === 'object' && feature !== null) {
      return feature.description || feature.text || JSON.stringify(feature);
    }
    return '';
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Project - Torkgo</title>
        </Head>
        <div className="loading-container">
          <div className="loading-message">Loading project details...</div>
        </div>
        <style jsx>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 50vh;
          }
          .loading-message {
            font-size: 1.2rem;
            color: var(--body-color);
          }
        `}</style>
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Head>
          <title>Project Not Found - Torkgo</title>
        </Head>
        <div className="error-container">
          <h1>Project Not Found</h1>
          <p>The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/project2" className="back-button">
            Back to Projects
          </Link>
        </div>
        <style jsx>{`
          .error-container {
            text-align: center;
            padding: 50px 20px;
            max-width: 600px;
            margin: 0 auto;
          }
          h1 {
            color: var(--heading-color);
            margin-bottom: 20px;
          }
          p {
            color: var(--body-color);
            margin-bottom: 30px;
          }
          .back-button {
            display: inline-block;
            padding: 12px 24px;
            background-color: var(--color-primary);
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }
          .back-button:hover {
            background-color: var(--color-primary-dark);
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} - Torkgo</title>
        <meta name="description" content={project.shortDescription} />
      </Head>

      <PageHeader 
        title={project.title} 
        text={project.shortDescription}
      />

      <section className="project-details-section padding-top padding-bottom">
        <div className="container">
          <div className="project-details-grid">
            <div className="project-image">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                quality={90}
              />
            </div>

            <div className="project-info">
              <div className="project-header">
                <h2>{project.title}</h2>
                <span className="project-symbol">{project.symbol}</span>
              </div>

              <div className="project-stats">
                <div className="stat-item">
                  <span className="stat-label">Price</span>
                  <span className="stat-value">{project.idoPrice}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Hard Cap</span>
                  <span className="stat-value">{project.hardCap}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Soft Cap</span>
                  <span className="stat-value">{project.softCap}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Supply</span>
                  <span className="stat-value">{project.totalSupply}</span>
                </div>
              </div>

              <div className="project-description">
                <h3>About Project</h3>
                <p>{project.description}</p>
              </div>

              {project.features && project.features.length > 0 && (
                <div className="project-features">
                  <h3>Features</h3>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>{renderFeature(feature)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {project.tokenomics && project.tokenomics.length > 0 && (
                <div className="project-tokenomics">
                  <h3>Tokenomics</h3>
                  <div className="tokenomics-grid">
                    {project.tokenomics.map((item, index) => (
                      <div key={index} className="tokenomics-item">
                        <span className="tokenomics-name">
                          {typeof item === 'object' ? item.name || item.category : item}
                        </span>
                        <span className="tokenomics-percentage">
                          {typeof item === 'object' ? item.percentage || item.value : ''}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.roadmap && project.roadmap.length > 0 && (
                <div className="project-roadmap">
                  <h3>Roadmap</h3>
                  <div className="roadmap-timeline">
                    {project.roadmap.map((item, index) => (
                      <div key={index} className="roadmap-item">
                        <div className="roadmap-phase">
                          {typeof item === 'object' ? item.phase || item.title : item}
                        </div>
                        <div className="roadmap-description">
                          {typeof item === 'object' ? item.description : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.socialLinks && (
                <div className="project-social">
                  <h3>Social Links</h3>
                  <div className="social-links">
                    {project.socialLinks.website && (
                      <a href={project.socialLinks.website} target="_blank" rel="noopener noreferrer" className="social-link">
                        Website
                      </a>
                    )}
                    {project.socialLinks.twitter && (
                      <a href={project.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                        Twitter
                      </a>
                    )}
                    {project.socialLinks.telegram && (
                      <a href={project.socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="social-link">
                        Telegram
                      </a>
                    )}
                    {project.socialLinks.discord && (
                      <a href={project.socialLinks.discord} target="_blank" rel="noopener noreferrer" className="social-link">
                        Discord
                      </a>
                    )}
                    {project.socialLinks.github && (
                      <a href={project.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .project-details-section {
          background-color: var(--body-bg);
        }

        .project-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 40px;
        }

        .project-image {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .project-image img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        .project-info {
          background: var(--card-bg);
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .project-header {
          margin-bottom: 20px;
        }

        .project-header h2 {
          font-size: 2rem;
          color: var(--heading-color);
          margin-bottom: 10px;
        }

        .project-symbol {
          display: inline-block;
          padding: 5px 10px;
          background-color: var(--color-primary);
          color: white;
          border-radius: 5px;
          font-size: 0.9rem;
        }

        .project-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 30px;
        }

        .stat-item {
          background: var(--card-bg-secondary);
          padding: 15px;
          border-radius: 5px;
          text-align: center;
        }

        .stat-label {
          display: block;
          font-size: 0.9rem;
          color: var(--body-color);
          margin-bottom: 5px;
        }

        .stat-value {
          display: block;
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--heading-color);
        }

        .project-description,
        .project-features,
        .project-tokenomics,
        .project-roadmap,
        .project-social {
          margin-bottom: 30px;
        }

        h3 {
          font-size: 1.5rem;
          color: var(--heading-color);
          margin-bottom: 15px;
        }

        .project-features ul {
          list-style: none;
          padding: 0;
        }

        .project-features li {
          padding: 10px 0;
          border-bottom: 1px solid var(--color-border);
          color: var(--body-color);
        }

        .project-features li:last-child {
          border-bottom: none;
        }

        .feature-item h4 {
          font-size: 1.1rem;
          color: var(--heading-color);
          margin-bottom: 5px;
        }

        .feature-item p {
          margin: 0;
          color: var(--body-color);
        }

        .tokenomics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .tokenomics-item {
          background: var(--card-bg-secondary);
          padding: 15px;
          border-radius: 5px;
          text-align: center;
        }

        .tokenomics-name {
          display: block;
          font-size: 0.9rem;
          color: var(--body-color);
          margin-bottom: 5px;
        }

        .tokenomics-percentage {
          display: block;
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--heading-color);
        }

        .roadmap-timeline {
          position: relative;
          padding-left: 20px;
        }

        .roadmap-timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background-color: var(--color-primary);
        }

        .roadmap-item {
          position: relative;
          padding-bottom: 20px;
        }

        .roadmap-item::before {
          content: '';
          position: absolute;
          left: -24px;
          top: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--color-primary);
        }

        .roadmap-phase {
          font-weight: 600;
          color: var(--heading-color);
          margin-bottom: 5px;
        }

        .roadmap-description {
          color: var(--body-color);
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .social-link {
          display: inline-block;
          padding: 8px 16px;
          background-color: var(--color-primary);
          color: white;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .social-link:hover {
          background-color: var(--color-primary-dark);
        }

        @media (max-width: 992px) {
          .project-details-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .project-stats,
          .tokenomics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectDetails; 