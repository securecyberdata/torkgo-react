import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Simple from "@/components/base/Simple";

import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

function Team({ team }) {
  // If no team data is provided, use default team members
  const defaultTeam = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "CEO & Founder",
      img: "/images/team/01.png",
      bio: "Blockchain veteran with 8+ years of experience in DeFi and crypto startups."
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "CTO",
      img: "/images/team/02.png",
      bio: "Smart contract developer and security expert with a background in Ethereum development."
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      role: "Head of Operations",
      img: "/images/team/03.png",
      bio: "Operations specialist with experience scaling fintech platforms and managing global teams."
    },
    {
      id: 4,
      name: "Emily Watson",
      role: "Head of Marketing",
      img: "/images/team/04.png",
      bio: "Marketing strategist specializing in blockchain and cryptocurrency community building."
    }
  ];

  const teamMembers = team && team.length > 0 ? team : defaultTeam;

  return (
    <section className="team padding-bottom shape-1r" id="team">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Team" title="Meet the crew" />
            </div>
          </div>
        </div>
        <div className="team__wrapper">
          <div className="row justify-content-center g-4">
            {teamMembers.slice(0, 4).map((item) => {
              return (
                <div key={item.id} className="col-lg-3 col-sm-6">
                  <div
                    className="team__item aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-duration={800}
                  >
                    <div className="team__thumb">
                      <img width="auto" src={item.img} alt="Team Member Image" />
                    </div>
                    <div className="team__content">
                      <h4>
                        <Link href="/team-member">{item.name}</Link>
                      </h4>
                      <p>{item.role}</p>
                      <p className="team__bio">{item.bio}</p>
                      <ul className="social">
                        <li className="social__item">
                          <Link href="#" className="social__link">
                            <FontAwesomeIcon icon={faFacebookF} />
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link href="#" className="social__link">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link href="#" className="social__link">
                            <FontAwesomeIcon icon={faTwitter} />
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link href="#" className="social__link">
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
