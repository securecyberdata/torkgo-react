import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { fetchData } from '@/apiConfig';
import PageHeader from "@/components/base/PageHeader";
import NewsLetterTwo from "@/components/partials/NewsLetterTwo";
import Image from "next/image";
import Simple from "@/components/base/Simple";

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

  const excludedMembers = ['Michele Cucchierato', 'Dr. Shermaine Nicholas', 'Brad Moore'];
  const filteredTeam = team.filter(member => !excludedMembers.includes(member.name));

  if (!filteredTeam || filteredTeam.length === 0) {
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

      <section className="team padding-bottom shape-1r" id="team">
        <div className="container">
          <div className="section-header-wrapper">
            <div className="section-header section-header--middle">
              <div className="section-header__content">
                <div className="section-header__titlebar">
                  <Simple subTitle="Team" title="Meet the crew" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="row justify-content-center g-4">
            {filteredTeam.map((member) => (
              <div key={member._id} className="col-lg-4 col-sm-6">
                <div
                  className="team__item aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={800}
                >
                  <div className="team__thumb">
                    <Image
                      src={member.img}
                      alt={`${member.name} - Team Member`}
                      width={800}
                      height={1000}
                      quality={90}
                      priority={member._id <= 3}
                      className="team__image"
                    />
                  </div>
                  <div className="team__content">
                    <h4>
                      <Link href={`/team-member?id=${member._id}`}>{member.name}</Link>
                    </h4>
                    <p>{member.role}</p>
                    <p className="team__bio">{member.bio}</p>
                    <ul className="social">
                      {member.social.twitter && (
                        <li className="social__item">
                          <Link href={member.social.twitter} className="social__link">
                            <FontAwesomeIcon icon={faTwitter} />
                          </Link>
                        </li>
                      )}
                      {member.social.linkedin && (
                        <li className="social__item">
                          <Link href={member.social.linkedin} className="social__link">
                            <FontAwesomeIcon icon={faLinkedin} />
                          </Link>
                        </li>
                      )}
                      {member.social.facebook && (
                        <li className="social__item">
                          <Link href={member.social.facebook} className="social__link">
                            <FontAwesomeIcon icon={faFacebook} />
                          </Link>
                        </li>
                      )}
                      {member.social.instagram && (
                        <li className="social__item">
                          <Link href={member.social.instagram} className="social__link">
                            <FontAwesomeIcon icon={faInstagram} />
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsLetterTwo />

      <style jsx>{`
        .team {
          padding: 4rem 0;
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

        .social {
          display: flex;
          gap: 15px;
          margin-top: 15px;
        }

        .social__item {
          list-style: none;
        }

        .social__link {
          color: var(--color-text-secondary);
          font-size: 1.2rem;
          transition: color 0.3s ease;
        }

        .social__link:hover {
          color: var(--color-primary);
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
