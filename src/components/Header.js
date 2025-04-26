import Link from "next/link";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useContext } from "react";

import Wallet from "./Wallet";
import { AppContext } from "@/context/AppContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useRouter } from 'next/router'
import Image from 'next/image';

function Header() {
  const [menu, setMenu] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter()
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  // ........header Sticky................
  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    router.events.on('routeChangeStart', removeActive);

    return () => {
      window.removeEventListener('scroll', isSticky);
      router.events.off('routeChangeStart', removeActive);
    };
  });

  const isSticky = (e) => {
    const header = document.querySelector('.header-section');
    const scrollTop = window.scrollY;
    scrollTop >= 250 ? header.classList.add('headerFixed') : header.classList.remove('headerFixed');
  };

  function closeAllMenus() {
    let elements = document.querySelectorAll(".menu-item-has-children.open");
    elements.forEach((item) => {
      item.classList.remove('open')
      item.querySelector('.submenu').style.display = 'none'
    })
  }

  // ...........main menu...............
  const toggleMenu = () => {
    setMenu(!menu);
    closeAllMenus()

  }

  //............submenu...............
  function removeActive() {
    const element = document.getElementById("menu");
    element.classList.remove("active");
    const icon = document.getElementById("icon");
    icon.classList.remove("active");
  }

  function toggleActive(event) {
    event.preventDefault()
    const mediaQuery = window.matchMedia('(max-width: 991px)');

    if (mediaQuery.matches) {
      // submenu open
      event.currentTarget.parentElement.classList.toggle('open')
      const submenu = event.currentTarget.nextElementSibling;
      if (!submenu.style.display || submenu.style.display === 'none') {
        submenu.style.display = "block"
      } else {
        submenu.style.display = "none"
      }
    }
  }


  // ..............modal....................
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const substr = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) : str;
  }

  const { account, isWalletConnected, connectWalletHandle, setAccountAfterDisconnectWallet } = useContext(AppContext);

  useEffect(() => {
    const checkWalletConnection = () => {
      if (isWalletConnected()) {
        connectWalletHandle();
      } else {
        setAccountAfterDisconnectWallet();
      }
    };
    
    checkWalletConnection();
  }, [isWalletConnected, connectWalletHandle, setAccountAfterDisconnectWallet]);

  return (
    <div>
      <header className={`header-section ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <div className="container">
          <div className="header-holder">
            <div className="header-primary d-flex flex-wrap justify-content-between align-items-center">
              <div className="brand-logo d-none d-lg-inline-block">
                <div className="logo">
                  <Link href="/">
                    <Image 
                      src={isDarkMode ? "/images/logo/logo_dark.png" : "/images/logo/logo_light.png"} 
                      width={150} 
                      height={55} 
                      alt="logo" 
                    />
                  </Link>
                </div>
              </div>
              <div className="header-wrapper justify-content-lg-end">
                <div className="mobile-logo d-lg-none"> 
                  <Link href="/">
                    <Image 
                      src={isDarkMode ? "/images/logo/logo_dark.png" : "/images/logo/logo_light.png"} 
                      width={150} 
                      height={55} 
                      alt="logo" 
                    />
                  </Link>
                </div>
                <div className="menu-area">
                  <ul id="menu" className={menu ? 'menu active' : 'menu'}>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li id="pr-2" className="menu-item-has-children">
                      <Link href="#" onClick={toggleActive}>Project</Link>
                      <ul className="submenu">
                        <li>
                          <Link href="/project">Projects</Link>
                        </li>
                        <li  >
                          <Link href="/projectdetails">Project Details</Link>
                        </li>
                        <li  > <Link href="/apply-project">Apply for Project</Link>
                        </li>
                        <li  >
                          <Link href="/tokenomics">Tokenomics</Link>
                        </li>
                      </ul>
                    </li>
                    {/* 
                    <li id="pr-3" className="menu-item-has-children">
                      <Link href="#" onClick={toggleActive}>Stacking</Link>
                      <ul className="submenu">
                        <li  >
                          <Link href="/stacking">Stacking</Link>
                        </li>
                        <li  > <Link href="/farming">Farming</Link>
                        </li>
                      </ul>
                    </li>
                    */}
                    <li id="pr-4" className="menu-item-has-children" >
                      <Link href="#" onClick={toggleActive}>Pages</Link>
                      <ul className="submenu">
                        {/*
                        <li  >
                          <Link href="/roadmap">Roadmap</Link>
                        </li>
                        */}
                        <li  > <Link href="/roadmap2">Roadmap 2</Link>
                        </li>
                        <li  >
                          <Link href="/faq">FAQ</Link>
                        </li>
                        <li>
                          <Link href="/leaderboard">Leaderboard</Link>
                        </li>
                        <li id="pr-5" className="menu-item-has-children" >
                          <Link href="#" onClick={toggleActive}>Team</Link>
                          <ul className="submenu">
                            <li  >
                              <Link href="/team">Team</Link>
                            </li>
                            <li  >
                              <Link href="/team-member">Team Member</Link>
                            </li>
                          </ul>
                        </li>
                        {/* KYC link commented out
                        <li  >
                          <Link href="/kyc">KYC</Link>
                        </li>
                        */}
                        {/* Account section commented out
                        <li id="pr-6" className="menu-item-has-children" >
                          <Link href="#" onClick={toggleActive}>Account</Link>
                          <ul className="submenu">
                            <li  >
                              <Link href="/signup">Sign Up</Link>
                            </li>
                            <li  >
                              <Link href="/login">Log In</Link>
                        */}
                        {/* 
                        <li  >
                          <Link href="/404">404</Link>
                        </li>
                        
                        <li  >
                          <Link href="/coming-soon">Coming Soon</Link>
                        </li>
                        */}
                      </ul>
                    </li>

                    {/*
                    <li id="pr-7" className="menu-item-has-children">
                      <Link href="#" onClick={toggleActive}>Blog</Link>
                      <ul className="submenu">
                        <li  >
                          <Link href="/blog">Blog </Link>
                        </li>
                        <li  >
                          <Link href="/blog2">Blog 2</Link>
                        </li>
                        <li  >
                          <Link href="/blog-single">Blog Single</Link>
                        </li>
                      </ul>
                    </li>
                    */}
                    <li  >
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                  {isWalletConnected() && account ? <Link onClick={() => handleShow()} className={`wallet-btn custom-wallet-btn ${isDarkMode ? 'dark-theme' : 'light-theme'}`} href="#">
                    {substr(account.toString(), 8)}
                  </Link> : <Link onClick={() => handleShow()} className={`wallet-btn ${isDarkMode ? 'dark-theme' : 'light-theme'}`} href="#">
                    <span>Connect </span> <FontAwesomeIcon icon={faWallet} />
                  </Link>}
                  <button 
                    onClick={toggleTheme} 
                    className={`theme-toggle-btn ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
                  </button>
                  <div id="icon" onClick={() => toggleMenu()} className={menu ? 'header-bar d-lg-none active' : 'header-bar d-lg-none'}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Wallet show={show} handleClose={handleClose}></Wallet>
    </div>
  );
}

export default Header;