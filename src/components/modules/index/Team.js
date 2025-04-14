import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Simple from "@/components/base/Simple";
import Image from "next/image";

import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { teamMembers } from "@/data/teamData";

function Team({ team }) {
  // If no team data is provided, use default team members from teamData.js
  const defaultTeam = teamMembers;

  const teamMembersToDisplay = team && team.length > 0 ? team : defaultTeam;

  return (
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
        <div className="team__wrapper">
          <div className="row justify-content-center g-4">
            {teamMembersToDisplay.map((item) => {
              return (
                <div key={item.id} className="col-lg-4 col-sm-6">
                  <div
                    className="team__item aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-duration={800}
                  >
                    <div className="team__thumb">
                      <Image
                        src={item.img}
                        alt={`${item.name} - Team Member`}
                        width={800}
                        height={1000}
                        quality={90}
                        priority={item.id <= 3}
                        className="team__image"
                      />
                    </div>
                    <div className="team__content">
                      <h4>
                        <Link href={`/team-member?id=${item.id}`}>{item.name}</Link>
                      </h4>
                      <p>{item.role}</p>
                      <p className="team__bio">{item.bio}</p>
                      <ul className="social">
                        <li className="social__item">
                          <Link href={item.social.twitter} className="social__link">
                            <FontAwesomeIcon icon={faTwitter} />
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link href={item.social.linkedin} className="social__link">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link href={item.social.facebook} className="social__link">
                            <FontAwesomeIcon icon={faFacebookF} />
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link href={item.social.instagram} className="social__link">
                            <FontAwesomeIcon icon={faInstagram} />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
