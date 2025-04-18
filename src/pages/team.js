import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { fetchData } from '@/apiConfig';
import PageHeader from "@/components/base/PageHeader";
import NewsLetterTwo from "@/components/partials/NewsLetterTwo";
import { teamMembers as defaultTeamMembers } from "@/data/teamData";
import Image from "next/image";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [investor, setInvestor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        console.log('Fetching team data...');
        
        // First try to get from localStorage
        const storedTeam = localStorage.getItem('teamMembers');
        console.log('Stored team data:', storedTeam);
        
        if (storedTeam) {
          try {
            const parsedTeam = JSON.parse(storedTeam);
            console.log('Parsed team data:', parsedTeam);
            if (Array.isArray(parsedTeam) && parsedTeam.length > 0) {
              setTeam(parsedTeam);
              setLoading(false);
              return;
            }
          } catch (parseError) {
            console.error('Error parsing stored team data:', parseError);
            localStorage.removeItem('teamMembers'); // Clear invalid data
          }
        }

        // If no localStorage data, try API
        console.log('No localStorage data, trying API...');
        const response = await fetch('http://localhost:3001/team');
        console.log('API response:', response);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API data:', data);
        
        if (data && Array.isArray(data)) {
          setTeam(data);
        } else if (data && data.team && Array.isArray(data.team)) {
          setTeam(data.team);
        } else if (data && data.data && Array.isArray(data.data)) {
          setTeam(data.data);
        } else {
          console.log('No valid data from API, using default team members');
          setTeam(defaultTeamMembers);
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
        setError(error.message);
        setTeam(defaultTeamMembers);
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

  // If we have team data but still showing loading, update the state
  useEffect(() => {
    if (team.length > 0 && loading) {
      setLoading(false);
    }
  }, [team, loading]);

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

  // If no team data is available, show a message
  if (!team || team.length === 0) {
    return (
      <div className="error-container">
        <h2>No Team Members Found</h2>
        <p>We couldn't find any team members to display.</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Our Team | Torkgo</title>
        <meta name="description" content="Meet our team of experts" />
      </Head>

      <PageHeader title="Our Team" text="Team" />
      {/* ==========>> Team Section start Here <<========== */}
      <section className="team padding-top padding-bottom shape-1r">
        <div className="container">
          <div className="section-header section-header--middle">
            <div className="section-header__content">
              <div className="section-header__titlebar">
                <h2 className="section-title">Meet the Crew</h2>
                <p className="section-subtitle">Our Team</p>
              </div>
            </div>
          </div>
          
          <div className="team__wrapper">
            <div className="row justify-content-center g-4">
              {team.map((member) => (
                <div key={member.id} className="col-lg-4 col-sm-6">
                  <div
                    className="team__item aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-duration={800}
                  >
                    <div className="team__thumb">
                      <Image
                        src={member.image || member.img}
                        alt={member.name}
                        width={800}
                        height={1000}
                        quality={90}
                        priority={member.id <= 3}
                        className="team__image"
                      />
                    </div>
                    <div className="team__content">
                      <h4>
                        <Link href={`/team-member?id=${member.id}`}>{member.name}</Link>
                      </h4>
                      <p>{member.role}</p>
                      <p className="team__bio">{member.bio}</p>
                      <div className="social-links">
                        {member.socialLinks?.linkedin && (
                          <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                          </a>
                        )}
                        {member.socialLinks?.twitter && (
                          <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                          </a>
                        )}
                        {member.socialLinks?.facebook && (
                          <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                          </a>
                        )}
                        {member.socialLinks?.instagram && (
                          <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                          </a>
                        )}
                        {/* Fallback for old data structure */}
                        {member.social?.linkedin && (
                          <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                          </a>
                        )}
                        {member.social?.twitter && (
                          <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                          </a>
                        )}
                        {member.social?.facebook && (
                          <a href={member.social.facebook} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                          </a>
                        )}
                        {member.social?.instagram && (
                          <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ==========>> Team Section end Here <<========== */}

      {/* ==========>> Investors Section start Here <<========== */}
      {investor && investor.length > 0 && (
        <section className="investor padding-bottom">
          <div className="container">
            <div className="section-header section-header--middle">
              <div className="section-header__content">
                <div className="section-header__titlebar">
                  <h2 className="section-title">Our Backers</h2>
                  <p className="section-subtitle">Investors</p>
                </div>
              </div>
            </div>
            <div className="investor__wrapper">
              <div className="row justify-content-center g-4">
                {investor.map((item) => {
                  return (
                    <div key={item.id} className="col-lg-3 col-sm-6">
                      <div
                        className="investor__item aos-init aos-animate"
                        data-aos="fade-up"
                        data-aos-duration={800}
                      >
                        <div className="investor__thumb">
                          <img width="auto" src={item.img} alt={`${item.name} - Investor`} />
                        </div>
                        <div className="investor__content">
                          <h4>{item.name}</h4>
                          <p>{item.role}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
      {/* ==========>> Investors Section end Here <<========== */}

      <NewsLetterTwo />

      <style jsx>{`
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

        .retry-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: var(--color-primary);
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }

        .retry-button:hover {
          background-color: var(--color-primary-dark);
        }

        .section-title {
          font-size: 2.5rem;
          margin-bottom: 10px;
          color: var(--color-primary);
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: var(--color-text-secondary);
          margin-bottom: 30px;
        }

        .team__item {
          background: var(--color-background-secondary);
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s ease;
          margin-bottom: 30px;
        }

        .team__item:hover {
          transform: translateY(-5px);
        }

        .team__thumb {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .team__image {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .team__content {
          padding: 20px;
        }

        .team__content h4 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: var(--color-primary);
        }

        .team__content p {
          color: var(--color-text-secondary);
          margin-bottom: 15px;
        }

        .team__bio {
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          gap: 15px;
          margin-top: 15px;
        }

        .social-links a {
          color: var(--color-text-secondary);
          font-size: 1.2rem;
          transition: color 0.3s ease;
        }

        .social-links a:hover {
          color: var(--color-primary);
        }

        .investor__item {
          background: var(--color-background-secondary);
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s ease;
          margin-bottom: 30px;
        }

        .investor__item:hover {
          transform: translateY(-5px);
        }

        .investor__thumb {
          position: relative;
          height: 200px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .investor__thumb img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .investor__content {
          padding: 20px;
          text-align: center;
        }

        .investor__content h4 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: var(--color-primary);
        }

        .investor__content p {
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }
      `}</style>
    </>
  );
};

export default Team;
