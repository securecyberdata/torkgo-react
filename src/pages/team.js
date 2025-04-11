import { useEffect, useState } from "react";
import Simple from "@/components/base/Simple";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import PageHeader from "@/components/base/PageHeader";
import NewsLetterTwo from "@/components/partials/NewsLetterTwo";
import { fetchData } from "@/apiConfig";
import Link from "next/link";
import { teamMembers } from "@/data/teamData";

const Team = () => {
  const [team, setTeam] = useState(teamMembers);
  const [investor, setInvestor] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await fetchData("/team");
        setTeam(response.length > 0 ? response : teamMembers);
      } catch (error) {
        setTeam(teamMembers);
      }
    };
    getAllData();
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await fetchData("/investor");
        setInvestor(response);
      } catch (error) {
        // Handle error
      }
    };
    getAllData();
  }, []);

  return (
    <>
      <PageHeader title="Our Team" text="Team" />
      {/* ==========>> Team Section start Here <<========== */}
      <section className="team padding-top padding-bottom shape-1r">
        <div className="container">
          <div className="section-header section-header--middle">
            <div className="section-header__content">
              <div className="section-header__titlebar">
                <Simple subTitle="Team" title="Meet the Crew" />
              </div>
            </div>
          </div>
          <div className="team__wrapper">
            <div className="row justify-content-center g-4">
              {team.map((item) => {
                return (
                  <div key={item.id} className="col-lg-3 col-sm-6">
                    <div
                      className="team__item aos-init aos-animate"
                      data-aos="fade-up"
                      data-aos-duration={800}
                    >
                      <div className="team__thumb">
                        <img width="auto" src={item.img} alt={`${item.name} - Team Member`} />
                      </div>
                      <div className="team__content">
                        <h4>
                          <Link href={`/team-member?id=${item.id}`}>{item.name}</Link>
                        </h4>
                        <p>{item.role}</p>
                        <p className="team__bio">{item.bio}</p>
                        <ul className="social">
                          <li className="social__item">
                            <a href={item.social.twitter} className="social__link">
                              <FontAwesomeIcon icon={faTwitter} />
                            </a>
                          </li>
                          <li className="social__item">
                            <a href={item.social.linkedin} className="social__link">
                              <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                          </li>
                          <li className="social__item">
                            <a href={item.social.facebook} className="social__link">
                              <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                          </li>
                          <li className="social__item">
                            <a href={item.social.instagram} className="social__link">
                              <FontAwesomeIcon icon={faInstagram} />
                            </a>
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
      {/* ==========>> Team Section end Here <<========== */}

      {/* ==========>> Investors Section start Here <<========== */}
      {investor && investor.length > 0 && (
        <section className="investor padding-bottom">
          <div className="container">
            <div className="section-header section-header--middle">
              <div className="section-header__content">
                <div className="section-header__titlebar">
                  <Simple subTitle="Investors" title="Our Backers" />
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
    </>
  );
};

export default Team;
