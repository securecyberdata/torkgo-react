import Simple from "@/components/base/Simple";
import Link from 'next/link';


function Work() {
  return (
    <section className="work padding-top padding-bottom bg--primary-color">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Getting Started" title="Simple as 1, 2, 3" />
            </div>
          </div>
        </div>
        <div className="work__wrapper">
          <div className="row justify-content-center g-4">
            <div className="col-lg-4 col-sm-6">
              <div className="work__item">
                <div className="work__item-inner">
                  <div className="work__item-thumb">
                    <img width="auto" src="/images/work/1.png"
                      alt="work Step 1 Image"
                    />
                  </div>
                  <div className="work__item-content">
                    <h4>1. Submit KYC</h4>
                    <p>
                      Complete our secure KYC verification process to ensure compliance and protect our community. This step helps maintain the integrity of our platform and safeguards all participants.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="work__item">
                <div className="work__item-inner">
                  <div className="work__item-thumb">
                    <img width="auto" src="/images/work/2.png"
                      alt="work Step 2 Image"
                    />
                  </div>
                  <div className="work__item-content">
                    <h4>2. Connect Wallet</h4>
                    <p>
                      Link your cryptocurrency wallet to our platform. We support multiple blockchain networks, allowing you to participate in IDOs across different ecosystems with ease and convenience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="work__item">
                <div className="work__item-inner">
                  <div className="work__item-thumb">
                    <img width="auto" src="/images/work/3.png"
                      alt="work Step 3 Image"
                    />
                  </div>
                  <div className="work__item-content">
                    <h4>3. Participate in IDOs</h4>
                    <p>
                      Browse upcoming IDO projects, stake tokens for allocation, and invest in promising blockchain ventures. Our platform provides transparent information and fair distribution mechanisms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <Link href="/kyc" className="default-btn">Verify KYC</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Work;
