import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiagramProject,
  faDiceD6,
  faWindowRestore,
  faRoad,
  faUserAstronaut,
  faGlobe,
  faArrowDown,
  faCloudArrowDown,
  faChartLine,
  faShieldHalved,
  faCode,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faDiscord,
  faTwitch,
  faFacebookF,
  faLinkedinIn,
  faTelegram,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import ApplyToLaunch from "@/components/common/ApplyToLaunch";
import PageHeader from "@/components/base/PageHeader";
import Link from "next/link";
import Image from "next/image";

const ProjectDetails = () => {
  return (
    <>
      <PageHeader title="Project Details" text="Discover the future of decentralized finance" />
      {/* ================> Project Details start here <================== */}
      <section className="pro-details padding-top padding-bottom">
        <div className="container">
          <div className="pro-details__wrapper">
            {/* project item */}
            <div className="pro-details__block mb-4">
              <div className="pro-details__block-inner">
                <div className="row g-5 align-items-center">
                  <div className="col-lg-7">
                    <div className="pro-details__item-wrap">
                      <div className="pro-details__item">
                        <div className="pro-details__item-thumb">
                          <Image 
                            width={800}
                            height={600}
                            src="/images/igo/project/nexus-protocol.png" 
                            alt="Nexus Protocol"
                            className="rounded-lg shadow-lg"
                          />
                        </div>
                        <div className="pro-details__item-content">
                          <h4>
                            Nexus Protocol <span>(NEX)</span>
                          </h4>
                          <p className="lead mb-4">
                            Revolutionizing DeFi through cross-chain interoperability and sustainable yield generation
                          </p>
                          <p>
                            Nexus Protocol is a next-generation DeFi platform that bridges the gap between different blockchain networks, enabling seamless asset transfers and yield optimization across multiple chains. Our innovative technology allows users to access the best yields across various protocols while maintaining security and reducing gas fees.
                          </p>
                        </div>
                      </div>
                      <div className="btn-group mt-4 d-flex flex-wrap gap-20">
                        <Link
                          href="/login"
                          className="default-btn default-btn--small"
                        >
                          <span>Participate in IDO</span>
                        </Link>
                        <Link
                          href="/whitepaper.pdf"
                          className="default-btn default-btn--small default-btn--secondary"
                          target="_blank"
                        >
                          <span>Read Whitepaper</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="pro-details__info">
                      <div className="row g-3">
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">
                              Total Supply
                            </h6>
                            <p className="pro-details__info-value">
                              100,000,000 NEX
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">Initial Market Cap</h6>
                            <p className="pro-details__info-value">$5,000,000</p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">
                              IDO Price
                            </h6>
                            <p className="pro-details__info-value">
                              $0.05 USD
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">
                              Vesting Period
                            </h6>
                            <p className="pro-details__info-value">
                              12 months
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">
                              Soft Cap
                            </h6>
                            <p className="pro-details__info-value">
                              $1,000,000
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="pro-details__info-item">
                            <h6 className="pro-details__info-name">
                              Hard Cap
                            </h6>
                            <p className="pro-details__info-value">
                              $5,000,000
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Features */}
            <div className="pro-details__block mb-4">
              <div className="pro-details__block-inner">
                <h3 className="section__header__title mb-4">Key Features</h3>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="feature-card p-4 rounded-lg shadow-sm">
                      <FontAwesomeIcon icon={faShieldHalved} className="feature-icon mb-3" />
                      <h5>Cross-Chain Security</h5>
                      <p>Advanced security protocols ensuring safe asset transfers across multiple blockchains</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-card p-4 rounded-lg shadow-sm">
                      <FontAwesomeIcon icon={faChartLine} className="feature-icon mb-3" />
                      <h5>Yield Optimization</h5>
                      <p>AI-powered yield farming strategies maximizing returns while minimizing risks</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="feature-card p-4 rounded-lg shadow-sm">
                      <FontAwesomeIcon icon={faCode} className="feature-icon mb-3" />
                      <h5>Smart Contracts</h5>
                      <p>Audited and verified smart contracts ensuring transparency and reliability</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tokenomics */}
            <div className="pro-details__block mb-4">
              <div className="pro-details__block-inner">
                <h3 className="section__header__title mb-4">Tokenomics</h3>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="tokenomics-card p-4 rounded-lg shadow-sm">
                      <h5>Token Distribution</h5>
                      <ul className="list-unstyled">
                        <li className="mb-2">• Public Sale: 20%</li>
                        <li className="mb-2">• Team & Advisors: 15%</li>
                        <li className="mb-2">• Development Fund: 25%</li>
                        <li className="mb-2">• Marketing: 10%</li>
                        <li className="mb-2">• Liquidity: 20%</li>
                        <li className="mb-2">• Community Rewards: 10%</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tokenomics-card p-4 rounded-lg shadow-sm">
                      <h5>Vesting Schedule</h5>
                      <ul className="list-unstyled">
                        <li className="mb-2">• Public Sale: 20% unlock at TGE, 6 months cliff, 12 months linear vesting</li>
                        <li className="mb-2">• Team & Advisors: 12 months cliff, 24 months linear vesting</li>
                        <li className="mb-2">• Development Fund: 6 months cliff, 36 months linear vesting</li>
                        <li className="mb-2">• Marketing: 3 months cliff, 12 months linear vesting</li>
                        <li className="mb-2">• Liquidity: 100% unlock at TGE</li>
                        <li className="mb-2">• Community Rewards: 6 months cliff, 24 months linear vesting</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Roadmap */}
            <div className="pro-details__block mb-4">
              <div className="pro-details__block-inner">
                <h3 className="section__header__title mb-4">Roadmap</h3>
                <div className="roadmap-timeline">
                  <div className="roadmap-item mb-4">
                    <div className="roadmap-date">Q1 2024</div>
                    <div className="roadmap-content">
                      <h5>Platform Launch</h5>
                      <ul>
                        <li>Initial IDO Launch</li>
                        <li>Core Protocol Development</li>
                        <li>Security Audits</li>
                      </ul>
                    </div>
                  </div>
                  <div className="roadmap-item mb-4">
                    <div className="roadmap-date">Q2 2024</div>
                    <div className="roadmap-content">
                      <h5>Expansion Phase</h5>
                      <ul>
                        <li>Cross-Chain Integration</li>
                        <li>Yield Optimization Features</li>
                        <li>Community Governance Launch</li>
                      </ul>
                    </div>
                  </div>
                  <div className="roadmap-item mb-4">
                    <div className="roadmap-date">Q3 2024</div>
                    <div className="roadmap-content">
                      <h5>Ecosystem Growth</h5>
                      <ul>
                        <li>Partnership Program</li>
                        <li>Advanced Trading Features</li>
                        <li>Mobile App Release</li>
                      </ul>
                    </div>
                  </div>
                  <div className="roadmap-item">
                    <div className="roadmap-date">Q4 2024</div>
                    <div className="roadmap-content">
                      <h5>Global Adoption</h5>
                      <ul>
                        <li>Enterprise Solutions</li>
                        <li>Institutional Integration</li>
                        <li>Global Expansion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="pro-details__block mb-4">
              <div className="pro-details__block-inner">
                <h3 className="section__header__title mb-4">Core Team</h3>
                <div className="row g-4">
                  <div className="col-md-4">
                    <div className="team-card text-center p-4 rounded-lg shadow-sm">
                      <Image 
                        src="/images/team/1.png" 
                        alt="Team Member" 
                        className="rounded-circle mb-3" 
                        width={120} 
                        height={120} 
                      />
                      <h5>Dr. Sarah Chen</h5>
                      <p className="text-muted">CEO & Founder</p>
                      <p>Former Head of Research at Ethereum Foundation</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="team-card text-center p-4 rounded-lg shadow-sm">
                      <Image 
                        src="/images/team/2.png" 
                        alt="Team Member" 
                        className="rounded-circle mb-3" 
                        width={120} 
                        height={120} 
                      />
                      <h5>Alex Thompson</h5>
                      <p className="text-muted">CTO</p>
                      <p>Blockchain Architect with 10+ years experience</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="team-card text-center p-4 rounded-lg shadow-sm">
                      <Image 
                        src="/images/team/3.png" 
                        alt="Team Member" 
                        className="rounded-circle mb-3" 
                        width={120} 
                        height={120} 
                      />
                      <h5>Maria Rodriguez</h5>
                      <p className="text-muted">Head of Product</p>
                      <p>DeFi Product Specialist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pro-details__block">
              <div className="pro-details__block-inner">
                <h3 className="section__header__title mb-4">Connect With Us</h3>
                <div className="social-links d-flex gap-3 justify-content-center">
                  <a href="#" className="social-link">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a href="#" className="social-link">
                    <FontAwesomeIcon icon={faTelegram} />
                  </a>
                  <a href="#" className="social-link">
                    <FontAwesomeIcon icon={faDiscord} />
                  </a>
                  <a href="#" className="social-link">
                    <FontAwesomeIcon icon={faMedium} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================> Project Details end here <================== */}
      <ApplyToLaunch />
    </>
  );
};

export default ProjectDetails;
