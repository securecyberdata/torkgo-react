import {
  faDiscord,
  faTwitch,
  faInstagram,
  faTwitter,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import Image from 'next/image';

function Footer() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div>
      <footer
        className="footer"
        style={{ backgroundImage: "url(images/footer/bg.png)" }}
      >
        <div className="footer__wrapper padding-top padding-bottom">
          <div className="container">
            <div className="footer__content text-center">
              <Link className="mb-4 d-inline-block" href="/">
                <Image 
                  src={isDarkMode ? "/images/logo/logo_dark.png" : "/images/logo/logo_light.png"}
                  width={150}
                  height={55}
                  alt="Logo"
                />
              </Link>
              <ul className="social justify-content-center">
                <li className="social__item">
                  <Link href="#" className="social__link">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Link>
                </li>
                <li className="social__item">
                  <Link href="#" className="social__link">
                    <FontAwesomeIcon icon={faDiscord} />
                  </Link>
                </li>
                <li className="social__item">
                  <Link href="#" className="social__link">
                    <FontAwesomeIcon icon={faTwitch} />
                  </Link>
                </li>
                <li className="social__item">
                  <Link href="#" className="social__link">
                    <FontAwesomeIcon icon={faInstagram} />
                  </Link>
                </li>
                <li className="social__item">
                  <Link href="#" className="social__link">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </Link>
                </li>
                <li className="social__item">
                  <Link href="#" className="social__link">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__copyright">
          <div className="container">
            <div className="text-center py-4">
              <p className="mb-0">
                PS bank IT Department © 2025 | All Rights Reserved | 
                <Link href="/terms" className="ms-2">Terms & Conditions</Link> | 
                <Link href="/privacy-policy" className="ms-2">Privacy Policy</Link> | 
                <Link href="/aml-kyc" className="ms-2">AML/KYC Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
