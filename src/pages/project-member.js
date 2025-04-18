import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTelegram, faGlobe } from '@fortawesome/free-brands-svg-icons';
import { fetchData } from '@/apiConfig';
import PageHeader from "@/components/base/PageHeader";
import NewsLetterTwo from "@/components/partials/NewsLetterTwo";
import { projects as defaultProjects } from "@/data/projectData";
import Link from "next/link";

const ProjectMember = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!id) return;

      try {
        console.log('Fetching project data for ID:', id);
        
        // First check if we have projects in localStorage
        const storedProjects = localStorage.getItem('projects');
        console.log('Stored projects:', storedProjects);
        
        if (storedProjects) {
          try {
            const parsedProjects = JSON.parse(storedProjects);
            console.log('Parsed projects:', parsedProjects);
            
            if (Array.isArray(parsedProjects)) {
              // Find the project with the matching ID
              const foundProject = parsedProjects.find(p => p.id.toString() === id.toString());
              console.log('Found project in localStorage:', foundProject);
              
              if (foundProject) {
                setProject(foundProject);
                setLoading(false);
                return;
              }
            }
          } catch (e) {
            console.error('Error parsing stored projects:', e);
          }
        }
        
        // If not found in localStorage, check default projects
        const defaultProject = defaultProjects.find(p => p.id.toString() === id.toString());
        console.log('Found project in default data:', defaultProject);
        
        if (defaultProject) {
          setProject(defaultProject);
          setLoading(false);
          return;
        }
        
        // If still not found, try API
        console.log('Project not found in localStorage or default data, trying API...');
        try {
          const response = await fetchData(`/projects/${id}`);
          console.log('API response:', response);
          
          if (response && response.project) {
            setProject(response.project);
          } else {
            setError('Project not found');
          }
        } catch (apiError) {
          console.error('API error:', apiError);
          setError('Failed to load project data from API');
        }
      } catch (err) {
        console.error('Error in fetchProjectData:', err);
        setError('Failed to load project data');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading project details...</h2>
        <p>Please wait while we fetch the project data.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link href="/project2" className="back-link">
          Back to Projects Page
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="error-container">
        <h2>Project Not Found</h2>
        <p>The requested project could not be found.</p>
        <Link href="/project2" className="back-link">
          Back to Projects Page
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} | Project | Torkgo</title>
        <meta name="description" content={project.shortDescription} />
      </Head>

      <PageHeader title={project.title} text="Project Details" />

      <div className="project-page">
        <div className="project-content">
          <div className="project-image">
            <Image
              src={project.image}
              alt={project.title}
              width={400}
              height={400}
              quality={90}
              priority
            />
          </div>

          <div className="project-details">
            <div className="project-header">
              <h2>{project.title}</h2>
              <p className="project-symbol">{project.symbol}</p>
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
              <div className="stat-item">
                <span className="stat-label">Initial Market Cap</span>
                <span className="stat-value">{project.initialMarketCap}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Vesting Period</span>
                <span className="stat-value">{project.vestingPeriod}</span>
              </div>
            </div>

            <div className="project-description">
              <h3>About</h3>
              <p>{project.description}</p>
            </div>

            {project.features && project.features.length > 0 && (
              <div className="project-features">
                <h3>Features</h3>
                <div className="features-grid">
                  {project.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <div className="feature-icon">
                        <FontAwesomeIcon icon={feature.icon} />
                      </div>
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.tokenomics && (
              <div className="project-tokenomics">
                <h3>Tokenomics</h3>
                
                {project.tokenomics.distribution && project.tokenomics.distribution.length > 0 && (
                  <div className="tokenomics-section">
                    <h4>Distribution</h4>
                    <ul>
                      {project.tokenomics.distribution.map((item, index) => (
                        <li key={index}>
                          <span className="category">{item.category}</span>
                          <span className="percentage">{item.percentage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {project.tokenomics.vesting && project.tokenomics.vesting.length > 0 && (
                  <div className="tokenomics-section">
                    <h4>Vesting Schedule</h4>
                    <ul>
                      {project.tokenomics.vesting.map((item, index) => (
                        <li key={index}>
                          <span className="category">{item.category}</span>
                          <span className="schedule">{item.schedule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {project.roadmap && project.roadmap.length > 0 && (
              <div className="project-roadmap">
                <h3>Roadmap</h3>
                <div className="roadmap-timeline">
                  {project.roadmap.map((milestone, index) => (
                    <div key={index} className="roadmap-item">
                      <div className="roadmap-quarter">{milestone.quarter}</div>
                      <div className="roadmap-content">
                        <h4>{milestone.title}</h4>
                        <ul>
                          {milestone.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.team && project.team.length > 0 && (
              <div className="project-team">
                <h3>Team</h3>
                <div className="team-grid">
                  {project.team.map((member, index) => (
                    <div key={index} className="team-member">
                      <div className="member-image">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={100}
                          height={100}
                          quality={90}
                        />
                      </div>
                      <h4>{member.name}</h4>
                      <p className="member-role">{member.role}</p>
                      <p className="member-bio">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="project-social">
              <h3>Connect</h3>
              <div className="social-links">
                {project.socialLinks?.twitter && (
                  <a href={project.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                    <span>Twitter</span>
                  </a>
                )}
                {project.socialLinks?.telegram && (
                  <a href={project.socialLinks.telegram} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTelegram} />
                    <span>Telegram</span>
                  </a>
                )}
                {project.socialLinks?.website && (
                  <a href={project.socialLinks.website} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGlobe} />
                    <span>Website</span>
                  </a>
                )}
                {project.socialLinks?.whitepaper && (
                  <a href={project.socialLinks.whitepaper} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGlobe} />
                    <span>Whitepaper</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsLetterTwo />

      <style jsx>{`
        .project-page {
          padding: 80px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .project-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 40px;
        }

        .project-image {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
        }

        .project-details {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .project-header {
          margin-bottom: 20px;
        }

        .project-header h2 {
          font-size: 2.5rem;
          margin-bottom: 10px;
          color: var(--color-primary);
        }

        .project-symbol {
          font-size: 1.2rem;
          color: var(--color-text-secondary);
        }

        .project-stats {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          background: var(--color-background-secondary);
          padding: 20px;
          border-radius: 10px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
        }

        .stat-value {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .project-description,
        .project-features,
        .project-tokenomics,
        .project-roadmap,
        .project-team,
        .project-social {
          background: var(--color-background-secondary);
          padding: 30px;
          border-radius: 10px;
        }

        h3 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: var(--color-primary);
        }

        h4 {
          font-size: 1.4rem;
          margin-bottom: 15px;
          color: var(--color-text-primary);
        }

        p {
          line-height: 1.8;
          color: var(--color-text-secondary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .feature-item {
          background: var(--color-background-primary);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }

        .feature-icon {
          font-size: 2rem;
          color: var(--color-primary);
          margin-bottom: 15px;
        }

        .tokenomics-section {
          margin-bottom: 30px;
        }

        .tokenomics-section ul {
          list-style: none;
          padding: 0;
        }

        .tokenomics-section li {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid var(--color-border);
        }

        .tokenomics-section li:last-child {
          border-bottom: none;
        }

        .category {
          font-weight: 500;
        }

        .percentage, .schedule {
          color: var(--color-text-secondary);
        }

        .roadmap-timeline {
          position: relative;
          padding-left: 30px;
        }

        .roadmap-timeline:before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--color-primary);
        }

        .roadmap-item {
          position: relative;
          margin-bottom: 30px;
        }

        .roadmap-item:before {
          content: '';
          position: absolute;
          left: -30px;
          top: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-primary);
        }

        .roadmap-quarter {
          font-weight: 600;
          color: var(--color-primary);
          margin-bottom: 10px;
        }

        .roadmap-content ul {
          list-style: none;
          padding-left: 20px;
        }

        .roadmap-content li {
          margin-bottom: 5px;
          position: relative;
        }

        .roadmap-content li:before {
          content: "•";
          position: absolute;
          left: -15px;
          color: var(--color-primary);
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
        }

        .team-member {
          background: var(--color-background-primary);
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }

        .member-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 15px;
        }

        .member-role {
          font-size: 0.9rem;
          color: var(--color-primary);
          margin-bottom: 10px;
        }

        .member-bio {
          font-size: 0.9rem;
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .social-links a {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .social-links a:hover {
          color: var(--color-primary);
        }

        .loading-container,
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          text-align: center;
          padding: 20px;
        }

        .error-container {
          color: var(--color-error);
        }

        .back-link {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
          text-decoration: none;
        }

        .back-link:hover {
          background-color: var(--color-primary-dark);
        }

        @media (max-width: 768px) {
          .project-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectMember; 