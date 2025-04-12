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

function Team({ team }) {
  // If no team data is provided, use default team members
  const defaultTeam = [
    {
      id: 1,
      name: "Michele Cucchierato",
      role: "Co-Founder, Chairman & CEO, Planet Sayari Group",
      img: "/images/team/michele.jpg",
      imgWidth: 800,
      imgHeight: 1000,
      bio: "Michele Cucchierato is the Co-Founder, Chairman, and CEO of Planet Sayari Group, a pioneering force in the evolution of crypto banking and digital finance. With a wealth of experience in the financial sector and deep expertise in blockchain technology, Michele bridges the worlds of traditional and decentralized finance with clarity, vision, and purpose."
    },
    {
      id: 2,
      name: "Dr. Shermaine Nicholas",
      role: "Founder & President of Social Responsibility, COO, Planet Sayari Group",
      img: "/images/team/sharmaine.jpg",
      imgWidth: 800,
      imgHeight: 1000,
      bio: "Dr. Shermaine Nicholas is the founder of Planet Sayari, a company at the forefront of revolutionizing crypto banking. With over 20 years of experience in business and a PhD in Christian Counseling, and currently pursuing a JD degree, Dr. Nicholas brings a rare blend of academic depth, industry insight, and visionary leadership."
    },
    {
      id: 3,
      name: "Brad Moore",
      role: "Co-Founder, Vice Chairman & Co-CEO, Planet Sayari",
      img: "/images/team/brad.jpg",
      imgWidth: 800,
      imgHeight: 1000,
      bio: "Brad Moore is a seasoned finance professional with over 20 years of experience in the financial services industry. He is a Co-Founder of Planet Sayari, and serves as the Co-CEO and Vice Chairman of the company. Holding a degree in business, and currently pursuing his MBA, Mr. Moore has built a career marked by deep expertise in financial strategy, risk management, and emerging financial technologies."
    },
    {
      id: 4,
      name: "Zaahir Ibrahim Pooloo",
      role: "CFO & Board member",
      img: "/images/team/zaahir.jpg",
      imgWidth: 800,
      imgHeight: 1000,
      bio: "Zaahir Ibrahim Pooloo is a key member of the Board of Directors at Planet Sayari Group. With a robust background in economics and extensive experience in the banking sector, Zaahir brings valuable insights and strategic direction to the company. His expertise in both traditional and innovative financial solutions plays a pivotal role in guiding the group's growth and success."
    },
    {
      id: 5,
      name: "Martha Reyes",
      role: "Board Member & Vice President of Human Resources, Planet Sayari Group",
      img: "/images/team/martha.jpg",
      imgWidth: 800,
      imgHeight: 1000,
      bio: "Martha Reyes serves as a Board Member and the Vice President of Human Resources at Planet Sayari Group, bringing over 30 years of leadership and supervisory experience to the organization. With a Bachelor's degree in Human Services and a professional certificate in Counseling, Martha combines a strong foundation in people-focused disciplines with a deep passion for the financial sector."
    }
  ];

  const teamMembers = team && team.length > 0 ? team : defaultTeam;

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
            {teamMembers.map((item) => {
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
                        width={item.imgWidth}
                        height={item.imgHeight}
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
