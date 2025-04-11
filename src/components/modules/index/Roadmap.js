import Simple from "@/components/base/Simple";
import DefaultButton from "@/components/base/DefaultButton";
import { useRouter } from "next/router";

function Roadmap() {
  const route = useRouter()
  return (
    <section className="roadmap padding-bottom" id="roadmap">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Explore" title="Our Roadmap" />
            </div>
          </div>
        </div>
        <div className="roadmap__wrapper2">
          <div className="row gy-4 gy-md-0 gx-5">
            <div className="col-md-6 offset-md-6">
              <div
                className="roadmap__item2 ms-md-4 aos-init aos-animate"
                data-aos="fade-left"
                data-aos-duration={800}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Platform Development</h4>
                      <p>01</p>
                    </div>
                    <p>
                      Initial development of our core platform infrastructure, including smart contracts, 
                      security protocols, and user interface. Comprehensive testing and auditing to ensure 
                      a secure and reliable launchpad experience for all users.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration={800}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Community Building</h4>
                      <p>02</p>
                    </div>
                    <p>
                      Launch of our website and social media channels to build a strong community. 
                      Implementation of KYC verification system and wallet integration to prepare for 
                      the first IDO launches on our platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 offset-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 aos-init aos-animate"
                data-aos="fade-left"
                data-aos-duration={800}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Token Launch</h4>
                      <p>03</p>
                    </div>
                    <p>
                      Public token sale with fair distribution mechanisms to ensure equal opportunity 
                      for all participants. Implementation of vesting schedules and token utility features 
                      to support long-term platform sustainability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration={800}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Staking Program</h4>
                      <p>04</p>
                    </div>
                    <p>
                      Introduction of our token staking program with multiple tiers offering different 
                      benefits. Stakers earn rewards while contributing to the platform's security and 
                      governance, creating a sustainable ecosystem for all participants.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 offset-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 aos-init aos-animate"
                data-aos="fade-left"
                data-aos-duration={800}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>IDO Platform Launch</h4>
                      <p>05</p>
                    </div>
                    <p>
                      Official launch of our IDO platform with the first projects going live. Implementation 
                      of fair distribution mechanisms, tiered allocation systems, and comprehensive project 
                      information to ensure transparent and equitable participation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration={800}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Multi-Chain Expansion</h4>
                      <p>06</p>
                    </div>
                    <p>
                      Expansion to multiple blockchain networks including Ethereum, Binance Smart Chain, 
                      Polygon, and more. Integration of cross-chain functionality to provide users with 
                      access to IDO opportunities across the entire blockchain ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Roadmap;
