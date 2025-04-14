import Simple from "@/components/base/Simple";
import DefaultButton from "@/components/base/DefaultButton";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faGlobe,
  faUsers,
  faChartLine,
  faShieldHalved,
  faCode,
  faHandshake,
  faMobile,
  faBuilding,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";

function RoadmapTwo() {
  const route = useRouter();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section className={`roadmap padding-bottom padding-top ${isDarkMode ? 'dark-theme' : 'light-theme'}`} id="roadmap">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Our Vision" title="Strategic Roadmap" />
            </div>
            <p className="section-header__text">
              Our comprehensive roadmap outlines the strategic milestones and development phases 
              that will guide our project from inception to global adoption.
            </p>
          </div>
        </div>
        
        <div className="roadmap__wrapper2">
          <div className="row gy-4 gy-md-0 gx-5">
            <div className="col-md-6 offset-md-6">
              <div
                className="roadmap__item2 ms-md-4 roadmap-item-visible"
                style={{ position: 'relative', zIndex: 6 }}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Project Inception</h4>
                      <p>01</p>
                    </div>
                    <div className="roadmap__item2-icon">
                      <FontAwesomeIcon icon={faRocket} />
                    </div>
                    <p>
                      Conceptualization and initial development of the Nexus Protocol. 
                      Core team formation, market research, and technical architecture design. 
                      Establishment of key partnerships and advisory board.
                    </p>
                    <ul className="roadmap__item2-list">
                      <li>Project vision and mission defined</li>
                      <li>Technical whitepaper development</li>
                      <li>Initial seed funding secured</li>
                      <li>Core development team assembled</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 roadmap-item-visible"
                style={{ position: 'relative', zIndex: 6 }}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Platform Development</h4>
                      <p>02</p>
                    </div>
                    <div className="roadmap__item2-icon">
                      <FontAwesomeIcon icon={faCode} />
                    </div>
                    <p>
                      Development of core smart contracts and backend infrastructure. 
                      Implementation of cross-chain interoperability protocols and security measures. 
                      Creation of user interface and experience design.
                    </p>
                    <ul className="roadmap__item2-list">
                      <li>Smart contract development and auditing</li>
                      <li>Cross-chain bridge implementation</li>
                      <li>Security protocols and testing</li>
                      <li>UI/UX design and development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 offset-md-6">
              <div
                className="roadmap__item2 ms-md-4 roadmap-item-visible"
                style={{ position: 'relative', zIndex: 6 }}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Token Launch & IDO</h4>
                      <p>03</p>
                    </div>
                    <div className="roadmap__item2-icon">
                      <FontAwesomeIcon icon={faGlobe} />
                    </div>
                    <p>
                      Initial DEX Offering (IDO) launch of the NEX token. 
                      Implementation of tokenomics and vesting schedules. 
                      Establishment of liquidity pools and initial exchange listings.
                    </p>
                    <ul className="roadmap__item2-list">
                      <li>Token generation and distribution</li>
                      <li>IDO platform integration</li>
                      <li>Liquidity pool establishment</li>
                      <li>Initial exchange listings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 roadmap-item-visible"
                style={{ position: 'relative', zIndex: 6 }}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Community Building</h4>
                      <p>04</p>
                    </div>
                    <div className="roadmap__item2-icon">
                      <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <p>
                      Expansion of community engagement and governance mechanisms. 
                      Implementation of staking and yield farming features. 
                      Development of educational resources and community programs.
                    </p>
                    <ul className="roadmap__item2-list">
                      <li>Community governance implementation</li>
                      <li>Staking and yield farming features</li>
                      <li>Educational content creation</li>
                      <li>Community ambassador program</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 offset-md-6">
              <div
                className="roadmap__item2 ms-md-4 roadmap-item-visible"
                style={{ position: 'relative', zIndex: 6 }}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Protocol Expansion</h4>
                      <p>05</p>
                    </div>
                    <div className="roadmap__item2-icon">
                      <FontAwesomeIcon icon={faChartLine} />
                    </div>
                    <p>
                      Expansion of protocol capabilities with advanced features. 
                      Integration with additional blockchain networks. 
                      Implementation of advanced yield optimization algorithms.
                    </p>
                    <ul className="roadmap__item2-list">
                      <li>Additional blockchain integrations</li>
                      <li>Advanced yield optimization features</li>
                      <li>Protocol upgrades and optimizations</li>
                      <li>Performance enhancements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 roadmap-item-visible"
                style={{ position: 'relative', zIndex: 6 }}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Security Enhancements</h4>
                      <p>06</p>
                    </div>
                    <div className="roadmap__item2-icon">
                      <FontAwesomeIcon icon={faShieldHalved} />
                    </div>
                    <p>
                      Implementation of advanced security measures and insurance protocols. 
                      Regular security audits and penetration testing. 
                      Development of emergency response mechanisms.
                    </p>
                    <ul className="roadmap__item2-list">
                      <li>Advanced security protocols</li>
                      <li>Insurance fund establishment</li>
                      <li>Regular security audits</li>
                      <li>Emergency response system</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 offset-md-6">
              <div
                className="roadmap__item2 ms-md-4 roadmap-item-visible"
                style={{ position: 'relative', zIndex: 6 }}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Strategic Partnerships</h4>
                      <p>07</p>
                    </div>
                    <div className="roadmap__item2-icon">
                      <FontAwesomeIcon icon={faHandshake} />
                    </div>
                    <p>
                      Formation of strategic partnerships with key industry players. 
                      Integration with established DeFi protocols and traditional financial institutions. 
                      Development of cross-platform solutions.
                    </p>
                    <ul className="roadmap__item2-list">
                      <li>Strategic partnership program</li>
                      <li>Integration with major DeFi protocols</li>
                      <li>Traditional finance partnerships</li>
                      <li>Cross-platform solution development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 roadmap-item-visible"
                style={{ position: 'relative', zIndex: 6 }}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Mobile Experience</h4>
                      <p>08</p>
                    </div>
                    <div className="roadmap__item2-icon">
                      <FontAwesomeIcon icon={faMobile} />
                    </div>
                    <p>
                      Development and launch of mobile applications for iOS and Android. 
                      Implementation of mobile-specific features and optimizations. 
                      Enhancement of user experience for mobile users.
                    </p>
                    <ul className="roadmap__item2-list">
                      <li>Mobile app development</li>
                      <li>Mobile-specific feature implementation</li>
                      <li>User experience optimization</li>
                      <li>App store launches</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 offset-md-6">
              <div
                className="roadmap__item2 ms-md-4 roadmap-item-visible"
                style={{ position: 'relative', zIndex: 6 }}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Enterprise Solutions</h4>
                      <p>09</p>
                    </div>
                    <div className="roadmap__item2-icon">
                      <FontAwesomeIcon icon={faBuilding} />
                    </div>
                    <p>
                      Development of enterprise-grade solutions for institutional clients. 
                      Implementation of compliance and regulatory features. 
                      Creation of customized solutions for specific industry needs.
                    </p>
                    <ul className="roadmap__item2-list">
                      <li>Enterprise solution development</li>
                      <li>Compliance and regulatory features</li>
                      <li>Institutional client onboarding</li>
                      <li>Custom solution development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 roadmap-item-visible"
                style={{ position: 'relative', zIndex: 6 }}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Global Expansion</h4>
                      <p>10</p>
                    </div>
                    <div className="roadmap__item2-icon">
                      <FontAwesomeIcon icon={faGlobeAmericas} />
                    </div>
                    <p>
                      Expansion into new geographical markets and regions. 
                      Localization of platform features and content. 
                      Establishment of regional offices and teams.
                    </p>
                    <ul className="roadmap__item2-list">
                      <li>Geographical market expansion</li>
                      <li>Platform localization</li>
                      <li>Regional office establishment</li>
                      <li>Global partnership network</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="roadmap__cta text-center mt-5">
          <DefaultButton
            text="Join Our Journey"
            link="/project2"
            className="default-btn--primary"
          />
        </div>
      </div>
    </section>
  );
}

export default RoadmapTwo;
