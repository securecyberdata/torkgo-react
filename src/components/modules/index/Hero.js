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
            <div className="col-lg-8">
              <div
                className="banner__content aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration={1000}
              >
                <h1 className="text-uppercase">
                  NEXT-GEN <br />
                  WEB3 <br />
                  LAUNCHPAD
                </h1>
                <p>
                  The premier platform for IDO & INO launches in the Web3 ecosystem. 
                  Access exclusive token sales, participate in fair distributions, and 
                  invest in the future of blockchain innovation.
                </p>
                <DefaultButton text="Explore Projects" link="/project2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
