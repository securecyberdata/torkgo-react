import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { fetchData } from '@/apiConfig';
import PageHeader from "@/components/base/PageHeader";
import NewsLetterTwo from "@/components/partials/NewsLetterTwo";
import Image from "next/image";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [investor, setInvestor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const data = await fetchData('/team');
        setTeam(data);
      } catch (error) {
        console.error('Error fetching team data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await fetchData("/investor");
        if (response && Array.isArray(response)) {
          setInvestor(response);
        }
      } catch (error) {
        console.error("Error fetching investor data:", error);
      }
    };
    getAllData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading team members...</h2>
        <p>Please wait while we fetch the team data.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!team || team.length === 0) {
    return (
      <div className="error-container">
        <h2>No Team Members Found</h2>
        <p>We couldn&apos;t find any team members to display.</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Our Team - Planet Sayari</title>
        <meta name="description" content="Meet the talented team behind Planet Sayari" />
      </Head>

      <PageHeader title="Our Team" />

      <section className="team-section">
        <div className="container">
          <div className="team-grid">
            {team.map((member) => (
              <div key={member._id} className="team-member">
                <div className="member-image">
                  <Image
                    src={member.img}
                    alt={member.name}
                    width={300}
                    height={300}
                    quality={90}
                  />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p className="bio">{member.bio}</p>
                  <div className="social-links">
                    {member.social.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    )}
                    {member.social.facebook && (
                      <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsLetterTwo />

      <style jsx>{`
        .team-section {
          padding: 4rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .team-member {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .team-member:hover {
          transform: translateY(-5px);
        }

        .member-image {
          position: relative;
          height: 300px;
        }

        .member-info {
          padding: 1.5rem;
        }

        .member-info h3 {
          font-size: 1.5rem;
          margin: 0 0 0.5rem 0;
          color: #333;
        }

        .role {
          color: #666;
          font-size: 1rem;
          margin: 0 0 1rem 0;
        }

        .bio {
          color: #333;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-links a {
          color: #666;
          font-size: 1.2rem;
          transition: color 0.3s ease;
        }

        .social-links a:hover {
          color: #333;
        }

        .loading-container,
        .error-container {
          text-align: center;
          padding: 4rem 1rem;
        }

        .loading-container h2,
        .error-container h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #333;
        }

        .loading-container p,
        .error-container p {
          color: #666;
          margin-bottom: 2rem;
        }

        .retry-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }

        .retry-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </>
  );
};

export default Team;
