import React, { useContext } from 'react';
import PageHeader from '@/components/base/PageHeader';
import { ThemeContext } from '@/context/ThemeContext';
import Link from 'next/link';

const PrivacyPolicy = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <>
      <PageHeader title="Privacy Policy" />
      <div className="terms__wrapper">
        <div className="terms__content">
          <div className="terms__header">
            <img 
              src={isDark ? "/images/logo-light.png" : "/images/logo-dark.png"} 
              alt="Planet Sayari Bank" 
              className="terms__logo"
            />
            <p className="terms__version">Last Updated: May 15, 2024</p>
          </div>

          <div className="terms__intro">
            <p className="terms__important">
              <strong>IMPORTANT:</strong> Please read this Privacy Policy carefully to understand our practices regarding your personal information. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Privacy Policy.
            </p>
          </div>

          <div className="terms__toc">
            <h3>Table of Contents</h3>
            <ul>
              <li><a href="#section1">1. What this Privacy Policy Covers</a></li>
              <li><a href="#section2">2. Information We Collect</a></li>
              <li><a href="#section3">3. How We Use Your Information</a></li>
              <li><a href="#section4">4. How We Share Your Information</a></li>
              <li><a href="#section5">5. Data Security</a></li>
              <li><a href="#section6">6. Updates to this Privacy Policy</a></li>
              <li><a href="#section7">7. Contact Us</a></li>
            </ul>
          </div>

          <h2 id="section1">1. What this Privacy Policy Covers</h2>
          <p>
            Please read this Privacy Policy carefully to understand our practices regarding your personal information. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Privacy Policy. If you do not agree to the terms of this Privacy Policy, please do not access or use our Services.
          </p>

          <h2 id="section2">2. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>
            We may collect certain personal information from you when you use our Services. The types of personal information we collect may include, but are not limited to:
          </p>
          <ul className="terms__list">
            <li>Your name</li>
            <li>Contact information, such as email address, phone number, and mailing address</li>
            <li>Payment information, including credit card details, bank account information, and billing address</li>
            <li>Information necessary for Know Your Customer (KYC) and anti-money laundering (AML) compliance, such as identification documents</li>
            <li>Transaction details, including the amount, recipient, and date of the payment</li>
            <li>Communication and support interactions with us</li>
          </ul>

          <h3>Usage Data</h3>
          <p>
            We collect server logs that may include details such as your IP address, browser type, device information, operating system, and referring/exit pages.
          </p>
          <p>
            Usage information: We collect information about your activity on our platform, such as the pages you visit, the features you use, and the actions you take.
          </p>
          <p>
            Cookies and similar technologies: We use cookies and similar tracking technologies to enhance your user experience and analyze usage patterns. For more information about the cookies we use and your choices regarding them, please refer to our Cookie Policy.
          </p>

          <h2 id="section3">3. How We Use Your Information</h2>
          <p>
            We use the information we collect from you for various purposes, including but not limited to:
          </p>
          <ul className="terms__list">
            <li>Providing and maintaining our Services</li>
            <li>Processing and facilitating secure transactions</li>
            <li>Verifying your identity and complying with legal obligations, including KYC and AML requirements</li>
            <li>Responding to your inquiries, requests, or customer support needs</li>
            <li>Sending you important notifications, updates, and administrative messages</li>
            <li>Improving and personalizing your experience on our platform</li>
            <li>Conducting research and analysis to enhance and develop our Services</li>
            <li>Protecting against fraud, unauthorized transactions, and other potential risks</li>
            <li>Enforcing our terms and policies</li>
          </ul>

          <h2 id="section4">4. How We Share Your Information</h2>
          <p>
            <strong>Service Providers:</strong> We engage trusted third-party service providers who assist us in delivering our Services, such as payment processors, fraud prevention services, customer support, and data analytics. These service providers are authorized to use your personal information only as necessary to provide services to us.
          </p>
          <p>
            We may disclose your information if required by law or if we believe that such disclosure is necessary to protect our rights, the safety of our users, or to comply with a judicial proceeding, court order, or legal process.
          </p>
          <p>
            In the event of a merger, acquisition, or sale of all or a portion of our assets, your personal information may be transferred as part of the transaction. We will notify you via email and/or prominent notice on our website of any change in ownership or the use of your personal information.
          </p>

          <h2 id="section5">5. Data Security</h2>
          <p>
            We employ industry-standard security measures to protect your personal information from unauthorized access, use, or disclosure. However, please be aware that no data transmission over the internet or storage system can be guaranteed to be 100% secure. Therefore, while we strive to protect your information, we cannot guarantee its absolute security.
          </p>

          <h2 id="section6">6. Updates to this Privacy Policy</h2>
          <p>
            We reserve the right to update or modify this Privacy Policy at any time without prior notice. Any changes will be effective immediately upon posting the revised Privacy Policy on our website. We encourage you to review this Privacy Policy periodically for any updates. Your continued use of our Services after any changes will constitute your acceptance of the revised Privacy Policy.
          </p>

          <h2 id="section7">7. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <ul className="terms__list">
            <li>Email: info@sayariglobal.com</li>
            <li>Address: Hamchako, Mutsamudu, The Autonomous Island of Anjouan, Union of Comoros</li>
            <li>Website: www.sayariglobal.com</li>
          </ul>

          <div className="terms__footer">
            <p>
              <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/terms">Terms and Conditions</Link> | <Link href="/contact">Contact Us</Link>
            </p>
            <p className="terms__copyright">
              © {new Date().getFullYear()} Planet Sayari Bank. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy; 