import Simple from "../base/Simple";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

function ApplyToLaunch() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <section
      className={`cta padding-bottom ${isDarkMode ? 'dark-theme' : 'light-theme'} apply-section-visible`}
      style={{ position: 'relative', zIndex: 1 }}
    >
      <div className="container">
        <div className="cta__wrapper" style={{ position: 'relative', zIndex: 2 }}>
          <div className="cta__content" style={{ position: 'relative', zIndex: 3 }}>
            <div className="section-header__content" style={{ marginBottom: '30px' }}>
              <div className="section-header__titlebar">
                <Simple subTitle="Have any projects?" title="Apply For IDO/INO" />
              </div>
            </div>
            <Link href="/apply-project" className="default-btn" style={{ position: 'relative', zIndex: 4 }}>
              Apply To Launch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApplyToLaunch;
