import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import PageHeader from "@/components/base/PageHeader";
import NewsLetterTwo from "@/components/partials/NewsLetterTwo";
import { teamMembers } from "@/data/teamData";
import Image from "next/image";

const TeamMember = () => {
  const router = useRouter();
  const { id } = router.query;
  const [member, setMember] = useState(null);

  useEffect(() => {
    if (id) {
      const memberId = parseInt(id);
      const foundMember = teamMembers.find(m => m.id === memberId);
      setMember(foundMember || teamMembers[0]);
    } else {
      setMember(teamMembers[0]);
    }
  }, [id]);

  if (!member) return null;

  return (
    <>
      <PageHeader title={member.name} text="Team Member" />
      {/* ==========>> Team Member Section start Here <<========== */}
      <section className="team-member padding-top padding-bottom">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="team-member__thumb">
                <Image 
                  src={member.img} 
                  alt={`${member.name} - Team Member`} 
                  width={800}
                  height={1000}
                  quality={90}
                  priority
                />
              </div>
              <div className="team-member__content">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
                <div className="expertise">
                  <h4>Expertise</h4>
                  <ul>
                    {member.expertise.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <ul className="social">
                  <li className="social__item">
                    <a href={member.social.twitter} className="social__link">
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li className="social__item">
                    <a href={member.social.linkedin} className="social__link">
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                  </li>
                  <li className="social__item">
                    <a href={member.social.facebook} className="social__link">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                  </li>
                  <li className="social__item">
                    <a href={member.social.instagram} className="social__link">
                      <FontAwesomeIcon icon={faInstagram} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="team-member__description">
                <h4>About {member.name}</h4>
                <p>{member.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ==========>> Team Member Section end Here <<========== */}

      <NewsLetterTwo />
    </>
  );
};

export default TeamMember;
