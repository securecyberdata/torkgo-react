import React, { useContext } from 'react';
import PageHeader from '@/components/base/PageHeader';
import { ThemeContext } from '@/context/ThemeContext';
import Link from 'next/link';

const AmlKyc = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <>
      <PageHeader title="AML/KYC Policy" />
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
              <strong>IMPORTANT:</strong> Financial institutions must be able to identify and understand risks of money-laundering and terrorist financing in order to apply preventive measures.
            </p>
          </div>

          <div className="terms__toc">
            <h3>Table of Contents</h3>
            <ul>
              <li><a href="#section1">1. Scope</a></li>
              <li><a href="#section2">2. The Policy in Brief</a></li>
              <li><a href="#section3">3. Preventive Measures</a></li>
              <li><a href="#section4">4. Customer Due Diligence</a></li>
              <li><a href="#section5">5. Screening and Monitoring</a></li>
              <li><a href="#section6">6. Politically Exposed Persons (PEPs)</a></li>
            </ul>
          </div>

          <h2 id="section1">1. Scope</h2>
          <p>
            Planet Sayari Bank's AML and CTF Policy applies for Planet Sayari Bank and all subsidiaries.
          </p>

          <h2 id="section2">2. The Policy in Brief</h2>
          <p>
            Anti-Money Laundering (AML) and Counter-Terrorist Financing (CTF) are prioritised focus areas within Planet Sayari Bank. Money-laundering and terrorist financing activities are threats to the integrity and the stability of the international financial system. Financial institutions must be able to identify and understand risks of money-laundering and terrorist financing to apply preventive measures.
          </p>
          <p>
            Planet Sayari Bank has a responsibility to its customers, shareholders, and regulators to prevent the Group from being used to facilitate the movement of criminal proceeds or transfer of funds destined to finance terrorism.
          </p>
          <p>
            Planet Sayari Bank is committed to identifying and managing the money-laundering and terrorist financing risks to which it is exposed and to take proportionate measures required to manage these risks across all jurisdictions in which it operates.
          </p>
          <p>
            Therefore, Planet Sayari Bank shall apply robust and consistent Anti-Money Laundering and Counter-Terrorist Financing standards and procedures to prevent the use of products, services, or channels for purposes of money-laundering and terrorist financing in the jurisdictions in which it operates.
          </p>
          <p>
            The policy is currently only internal.
          </p>

          <h2 id="section3">3. Preventive Measures</h2>
          <p>
            Given that criminals may use financial services to launder money to fund their criminal activities, proper Know-Your-Customer (KYC) practices are central.
          </p>
          <p>
            Knowledge of the customer helps us understand the general activities in which the customer would usually be expected to engage. As a bank, we are required to detect unusual and suspicious activities and to determine whether a specific customer is present on various sanctions lists.
          </p>
          <p>
            Money-laundering and terrorism not only harm the whole of society, but can also damage the stability and reputation of the financial sector. It is obviously in the best interests of the financial industry and of society that financial institutions take all reasonable measures to prevent money-laundering and terrorist financing.
          </p>
          <p>
            To detect money-laundering, Planet Sayari Bank cooperates with a number of actors, including other banks, authorities, and the police. Planet Sayari Bank also has procedures such as the following in place:
          </p>
          <ul className="terms__list">
            <li>Planet Sayari Bank has adopted a policy on prevention of money-laundering and counter-terrorist financing that requires all parts of Planet Sayari Bank Group to develop and implement effective programs to comply with applicable laws.</li>
          </ul>

          <h2 id="section4">4. Customer Due Diligence</h2>
          <p>
            Customer Due Diligence (CDD) includes, among other things, identifying the customer and verifying the customer's identity on the basis of documents, data or information obtained from reliable and independent sources. We also need to understand the ownership and control structure of our customers.
          </p>

          <h2 id="section5">5. Screening and Monitoring</h2>
          <p>
            Planet Sayari Bank performs daily screening of the customer base against financial sanctions and PEP lists. All international payments are also screened in real time regarding financial sanctions.
          </p>
          <p>
            The initiation or maintenance of a business relationship with a PEP or other relevant high-risk customer needs to be approved by an authorised decision-maker.
          </p>

          <h2 id="section6">6. Politically Exposed Persons (PEPs)</h2>
          <p>
            Person in politically exposed position (or PEP, from the English term Politically Exposed Person). A person in a politically exposed position, and the family members and well-known colleagues of this person, through their position and influence, are considered to have a position which in itself constitutes a risk of being exploited for, among other things, bribery.
          </p>

          <div className="terms__footer">
            <p>
              <Link href="/privacy-policy">Privacy Policy</Link> | <Link href="/terms">Terms and Conditions</Link> | <Link href="/aml-kyc">AML/KYC Policy</Link> | <Link href="/contact">Contact Us</Link>
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

export default AmlKyc; 