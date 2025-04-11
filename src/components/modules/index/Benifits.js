import Simple from "@/components/base/Simple";
import DefaultButton from "@/components/base/DefaultButton";



function Benefits() {


  return (
    <section className="benifit bg--primary-color padding-top padding-bottom">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Benefits" title="What we offer" />
            </div>
          </div>
        </div>
        <div className="benifit__wrapper">
          <div className="row g-5">
            <div className="col-lg-3 col-sm-6">
              <div className="benifit__item">
                <div className="benifit__item-inner">
                  <div className="benifit__item-thumb">
                    <img width="auto" src="/images/benifit/01.png"
                      alt="Benifit image"
                    />
                  </div>
                  <div className="benifit__item-content">
                    <h4>Cross Chain</h4>
                    <p>
                      Access IDO opportunities across multiple blockchain networks including Ethereum, Binance Smart Chain, Polygon, and more. Our platform eliminates the need to switch between different launchpads.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="benifit__item">
                <div className="benifit__item-inner">
                  <div className="benifit__item-thumb">
                    <img width="auto" src="/images/benifit/02.png"
                      alt="Benifit image"
                    />
                  </div>
                  <div className="benifit__item-content">
                    <h4>Staking Rewards</h4>
                    <p>
                      Earn additional rewards by staking your tokens on our platform. Higher staking tiers unlock greater allocation percentages and exclusive access to premium IDO projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="benifit__item">
                <div className="benifit__item-inner">
                  <div className="benifit__item-thumb">
                    <img width="auto" src="/images/benifit/03.png"
                      alt="Benifit image"
                    />
                  </div>
                  <div className="benifit__item-content">
                    <h4>Multi Layer Security</h4>
                    <p>
                      Our platform implements advanced security measures including smart contract audits, multi-signature wallets, and real-time monitoring to protect your investments and personal information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="benifit__item">
                <div className="benifit__item-inner">
                  <div className="benifit__item-thumb">
                    <img width="auto" src="/images/benifit/04.png"
                      alt="Benifit image"
                    />
                  </div>
                  <div className="benifit__item-content">
                    <h4>Elite Projects</h4>
                    <p>
                      Gain access to carefully vetted blockchain projects with strong fundamentals, experienced teams, and innovative technology. Our due diligence process ensures only high-quality opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

export default Benefits;
