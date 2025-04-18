import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { projects } from '@/data/projectData';
import PageHeader from '@/components/base/PageHeader';

const ProjectDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="container padding-top padding-bottom">
        <div className="text-center">
          <h2>Project not found</h2>
          <Link href="/project2" className="default-btn">
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} - Planet Sayari Bank</title>
        <meta name="description" content={project.shortDescription} />
      </Head>

      <PageHeader title={project.title} text={project.shortDescription} />

      <section className="project-details padding-top padding-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="project-content">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                
                <div className="project-info">
                  <h2>About {project.title}</h2>
                  <p>{project.description}</p>
                </div>

                <div className="project-features">
                  <h3>Key Features</h3>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-tokenomics">
                  <h3>Tokenomics</h3>
                  <div className="tokenomics-grid">
                    {project.tokenomics.distribution.map((item, index) => (
                      <div key={index} className="tokenomics-item">
                        <span className="label">{item.category}</span>
                        <span className="value">{item.percentage}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="mt-4">Vesting Schedule</h4>
                  <div className="tokenomics-grid">
                    {project.tokenomics.vesting.map((item, index) => (
                      <div key={index} className="tokenomics-item">
                        <span className="label">{item.category}</span>
                        <span className="value">{item.schedule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="project-roadmap">
                  <h3>Roadmap</h3>
                  <div className="roadmap-timeline">
                    {project.roadmap.map((item, index) => (
                      <div key={index} className="roadmap-item">
                        <div className="roadmap-date">{item.date}</div>
                        <div className="roadmap-content">
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="project-sidebar">
                <div className="sidebar-card">
                  <h3>Project Details</h3>
                  <div className="details-list">
                    <div className="detail-item">
                      <span className="label">Symbol</span>
                      <span className="value">{project.symbol}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Total Supply</span>
                      <span className="value">{project.totalSupply}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Initial Market Cap</span>
                      <span className="value">{project.initialMarketCap}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">IDO Price</span>
                      <span className="value">{project.idoPrice}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Vesting Period</span>
                      <span className="value">{project.vestingPeriod}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Soft Cap</span>
                      <span className="value">{project.softCap}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Hard Cap</span>
                      <span className="value">{project.hardCap}</span>
                    </div>
                  </div>
                </div>

                <div className="sidebar-card">
                  <h3>Project Team</h3>
                  <div className="team-list">
                    {project.team.map((member, index) => (
                      <div key={index} className="team-member">
                        <img src={member.image} alt={member.name} />
                        <div className="member-info">
                          <h4>{member.name}</h4>
                          <p>{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sidebar-card">
                  <h3>Social Links</h3>
                  <div className="social-links">
                    {Object.entries(project.socialLinks).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .project-details {
          background-color: #f8f9fa;
        }

        .project-content {
          background: white;
          border-radius: 10px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .project-image {
          width: 100%;
          height: 400px;
          overflow: hidden;
          border-radius: 10px;
          margin-bottom: 2rem;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .project-info h2 {
          margin-bottom: 1rem;
          color: #333;
        }

        .project-info p {
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .project-features h3,
        .project-tokenomics h3,
        .project-roadmap h3 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .project-features ul {
          list-style: none;
          padding: 0;
        }

        .project-features li {
          padding: 1rem 0;
          color: #666;
          border-bottom: 1px solid #eee;
        }

        .project-features li:last-child {
          border-bottom: none;
        }

        .project-features li h4 {
          color: #333;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .project-features li p {
          margin: 0;
          line-height: 1.6;
        }

        .tokenomics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .tokenomics-item {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 5px;
        }

        .tokenomics-item .label {
          display: block;
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .tokenomics-item .value {
          display: block;
          color: #333;
          font-weight: 600;
        }

        .roadmap-timeline {
          position: relative;
          padding-left: 2rem;
        }

        .roadmap-timeline:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #007bff;
        }

        .roadmap-item {
          position: relative;
          padding-bottom: 2rem;
        }

        .roadmap-item:before {
          content: "";
          position: absolute;
          left: -2.4rem;
          top: 0.5rem;
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background: #007bff;
        }

        .roadmap-date {
          color: #007bff;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .roadmap-content h4 {
          margin-bottom: 0.5rem;
          color: #333;
        }

        .roadmap-content p {
          color: #666;
          line-height: 1.6;
        }

        .project-sidebar {
          position: sticky;
          top: 2rem;
        }

        .sidebar-card {
          background: white;
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .sidebar-card h3 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .details-list {
          display: grid;
          gap: 1rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #eee;
        }

        .detail-item .label {
          color: #666;
        }

        .detail-item .value {
          color: #333;
          font-weight: 600;
        }

        .team-list {
          display: grid;
          gap: 1rem;
        }

        .team-member {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .team-member img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        .member-info h4 {
          margin: 0;
          font-size: 1rem;
          color: #333;
        }

        .member-info p {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
        }

        .social-links {
          display: grid;
          gap: 0.5rem;
        }

        .social-link {
          display: block;
          padding: 0.75rem;
          background: #f8f9fa;
          color: #333;
          text-decoration: none;
          border-radius: 5px;
          text-align: center;
          transition: background-color 0.3s ease;
        }

        .social-link:hover {
          background: #e9ecef;
        }

        .default-btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .default-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  );
};

export default ProjectDetails; 