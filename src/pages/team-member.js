import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { fetchData } from '@/apiConfig';
import PageHeader from "@/components/base/PageHeader";
import NewsLetterTwo from "@/components/partials/NewsLetterTwo";
import { teamMembers as defaultTeamMembers } from "@/data/teamData";
import Link from "next/link";

const TeamMember = () => {
  const router = useRouter();
  const { id } = router.query;
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!id) return;

      try {
        console.log('Fetching member data for ID:', id);
        
        // First check if we have team members in localStorage
        const storedTeamMembers = localStorage.getItem('teamMembers');
        console.log('Stored team members:', storedTeamMembers);
        
        if (storedTeamMembers) {
          try {
            const parsedTeamMembers = JSON.parse(storedTeamMembers);
            console.log('Parsed team members:', parsedTeamMembers);
            
            if (Array.isArray(parsedTeamMembers)) {
              // Find the member with the matching ID
              const foundMember = parsedTeamMembers.find(m => m.id.toString() === id.toString());
              console.log('Found member in localStorage:', foundMember);
              
              if (foundMember) {
                setMember(foundMember);
                setLoading(false);
                return;
              }
            }
          } catch (e) {
            console.error('Error parsing stored team members:', e);
          }
        }
        
        // If not found in localStorage, check default team members
        const defaultMember = defaultTeamMembers.find(m => m.id.toString() === id.toString());
        console.log('Found member in default data:', defaultMember);
        
        if (defaultMember) {
          setMember(defaultMember);
          setLoading(false);
          return;
        }
        
        // If still not found, try API
        console.log('Member not found in localStorage or default data, trying API...');
        try {
          const response = await fetchData(`/team/${id}`);
          console.log('API response:', response);
          
          if (response && response.member) {
            setMember(response.member);
          } else {
            setError('Member not found');
          }
        } catch (apiError) {
          console.error('API error:', apiError);
          setError('Failed to load member data from API');
        }
      } catch (err) {
        console.error('Error in fetchMemberData:', err);
        setError('Failed to load member data');
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading member details...</h2>
        <p>Please wait while we fetch the team member data.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link href="/team" className="back-link">
          Back to Team Page
        </Link>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="error-container">
        <h2>Member Not Found</h2>
        <p>The requested team member could not be found.</p>
        <Link href="/team" className="back-link">
          Back to Team Page
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{member.name} | Team Member | Torkgo</title>
        <meta name="description" content={member.bio} />
      </Head>

      <PageHeader title={member.name} text="Team Member" />

      <div className="member-page">
        <div className="member-content">
          <div className="member-image">
            <Image
              src={member.image || member.img}
              alt={member.name}
              width={400}
              height={500}
              quality={90}
              priority
            />
          </div>

          <div className="member-details">
            <div className="bio-section">
              <h2>About</h2>
              <p>{member.bio}</p>
            </div>

            {member.description && (
              <div className="description-section">
                <h2>Description</h2>
                <p>{member.description}</p>
              </div>
            )}

            {member.expertise && (
              <div className="expertise-section">
                <h2>Expertise</h2>
                <ul>
                  {Array.isArray(member.expertise) 
                    ? member.expertise.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    : typeof member.expertise === 'string' 
                      ? member.expertise.split(',').map((item, index) => (
                          <li key={index}>{item.trim()}</li>
                        ))
                      : <li>{member.expertise}</li>
                  }
                </ul>
              </div>
            )}

            <div className="social-links">
              <h2>Connect</h2>
              <div className="links">
                {(member.socialLinks?.linkedin || member.social?.linkedin) && (
                  <a href={member.socialLinks?.linkedin || member.social?.linkedin} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                    <span>LinkedIn</span>
                  </a>
                )}
                {(member.socialLinks?.twitter || member.social?.twitter) && (
                  <a href={member.socialLinks?.twitter || member.social?.twitter} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                    <span>Twitter</span>
                  </a>
                )}
                {(member.socialLinks?.facebook || member.social?.facebook) && (
                  <a href={member.socialLinks?.facebook || member.social?.facebook} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} />
                    <span>Facebook</span>
                  </a>
                )}
                {(member.socialLinks?.instagram || member.social?.instagram) && (
                  <a href={member.socialLinks?.instagram || member.social?.instagram} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsLetterTwo />

      <style jsx>{`
        .member-page {
          padding: 80px 20px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .member-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 40px;
        }

        .member-image {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
        }

        .member-details {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .bio-section,
        .description-section,
        .expertise-section,
        .social-links {
          background: var(--color-background-secondary);
          padding: 30px;
          border-radius: 10px;
        }

        h2 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: var(--color-primary);
        }

        p {
          line-height: 1.8;
          color: var(--color-text-secondary);
        }

        .expertise-section ul {
          list-style: none;
          padding: 0;
        }

        .expertise-section li {
          margin-bottom: 10px;
          padding-left: 20px;
          position: relative;
          color: var(--color-text-secondary);
        }

        .expertise-section li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: var(--color-primary);
        }

        .social-links .links {
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
          .member-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default TeamMember;
