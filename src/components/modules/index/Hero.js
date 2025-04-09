import DefaultButton from "@/components/base/DefaultButton";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const Hero = () => {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <section
      className={`banner ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
      id="home"
      style={{ backgroundImage: `url(/images/banner/${isDarkMode ? 'bg-dark.png' : 'bg.png'})` }}
    >
      <div className="container">
        <div className="banner__wrapper">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div
                className="banner__content aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration={1000}
              >
                <h1 className="text-uppercase">
                  WEB 3.0 <br />
                  Launchpad <br />
                  for IDO &amp; INO
                </h1>
                <p>
                  The next generation gaming ecosystem for IDO&apos;s and INO
                  launchpad web 3.0 platform
                </p>
                <DefaultButton text="ExploreIDO" />
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="banner__thumb aos-init aos-animate"
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                <img width="auto" src={`/images/banner/banner-thumb/${isDarkMode ? '01-dark.png' : '01.png'}`}
                  alt="banner Image"
                />
                <div className="shape-2">
                  <img width="auto" src={`/images/banner/banner-thumb/${isDarkMode ? 'shape3-dark.png' : 'shape3.png'}`}
                    alt="Banner Shape"
                  />
                </div>
                <div className="shape-3">
                  <img width="auto" src={`/images/banner/banner-thumb/${isDarkMode ? 'shape1-dark.png' : 'shape1.png'}`}
                    alt="Banner Shape"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
