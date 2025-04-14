import React, { useContext } from 'react';
import PageHeader from '@/components/base/PageHeader';
import { ThemeContext } from '@/context/ThemeContext';
import Link from 'next/link';

const Terms = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <>
      <PageHeader title="Terms and Conditions" />
      <div className="terms__wrapper">
        <div className="terms__content">
          <div className="terms__header">
            <img 
              src={isDark ? "/images/logo-light.png" : "/images/logo-dark.png"} 
              alt="Planet Sayari Bank" 
              className="terms__logo"
            />
            <p className="terms__version">Version 2.0 - Last Updated: May 15, 2024</p>
          </div>

          <div className="terms__intro">
            <p className="terms__important">
              <strong>IMPORTANT:</strong> Please read these Terms and Conditions carefully before using Planet Sayari Bank services. By accessing or using our services, you agree to be bound by these terms.
            </p>
          </div>

          <div className="terms__toc">
            <h3>Table of Contents</h3>
            <ul>
              <li><a href="#section1">1. Why this document is important</a></li>
              <li><a href="#section2">2. What type of account is my Account?</a></li>
              <li><a href="#section3">3. Using money in your Account</a></li>
              <li><a href="#section4">4. Can I open an Account?</a></li>
              <li><a href="#section5">5. How do I get information on payments</a></li>
              <li><a href="#section6">6. Account Security and Access</a></li>
              <li><a href="#section7">7. Fees and Charges</a></li>
              <li><a href="#section8">8. Making Changes to Your Account</a></li>
              <li><a href="#section9">9. Closing Your Account</a></li>
              <li><a href="#section10">10. Data Protection and Privacy</a></li>
              <li><a href="#section11">11. Investment Services and Risks</a></li>
              <li><a href="#section12">12. Complaints</a></li>
              <li><a href="#section13">13. Our Legal Responsibility</a></li>
              <li><a href="#section14">14. Transfer of Rights</a></li>
              <li><a href="#section15">15. Governing Law</a></li>
              <li><a href="#section16">16. Contact Information</a></li>
            </ul>
          </div>

          <h2 id="section1">1. Why this document is important</h2>
          <p>
            This document sets out the terms and conditions for your Planet Sayari Bank/PSB Personal and Business account (your "Account") and its related services. It also sets out other important things that you need to know.
          </p>
          <p>
            These terms and conditions, along with the Fees Page and any other terms and conditions that apply to our services, form a legal agreement (the "Agreement", or the "Terms") between:
          </p>
          <ul className="terms__list">
            <li>you, the account holder; and</li>
            <li>us, Planet Sayari Bank/PSB.</li>
          </ul>
          <p>
            We are a Comoros Island company, with address in Hamchako, Mutsamudu, The Autonomous Island of Anjouan, Union of Comoros, with Banking License L15802/PSB released by UNION OF COMOROS OFFSHORE FINANCE AUTHORITY and for management of bank accounts for our clients. It's important for you to understand how your Account works. You can ask for a copy of these Terms through the Planet Sayari Bank/PSB app, at any time.
          </p>
          <p>
            If you'd like more information you might find it helpful to write to our informational email support@planetsayaribank.com.
          </p>
          <p>
            The main way we provide our services is through the Planet Sayari Bank/PSB mobile app. However, we provide our services in other ways too, like through web pages, meetings, video calls and other means. These terms apply whenever and however you access our services.
          </p>

          <h2 id="section2">2. What type of account is my Account?</h2>
          <p>
            Your Account is a "virtual" account that holds your e-money. It may hold e-money in different currencies at the same time.
          </p>
          <p>
            E-money is an electronic alternative to cash. If you or someone else gives us money in one currency, we'll issue an equivalent value of e-money in that currency. We'll store the e-money in your Account, and other people will accept it as payment. In these Terms, we use "money" to refer to e-money.
          </p>

          <h2 id="section3">3. Using money in your Account</h2>
          <p>Once you have e-money in your Account you'll be able to use our services. For example, you can do the following:</p>
          <ul className="terms__list">
            <li>send money to and receive money from other Planet Sayari Bank/PSB Accounts and non-Planet Sayari Bank/PSB Accounts;</li>
            <li>change money from one currency to another (we call this a "currency exchange"). The currencies available might change occasionally;</li>
            <li>make payments and withdraw cash using your Planet Sayari Bank/PSB Card; and</li>
            <li>view information about and manage your Account.</li>
          </ul>
          <p>
            We add new features and services all the time. We'll let you know about these through the Planet Sayari Bank/PSB app.
          </p>

          <h2 id="section4">4. Can I open an Account?</h2>
          <p>
            Normally, you must be 18 or over to open an Account. If you are under 18 and we let you have an Account or any other service, we'll let you know any special terms and conditions that apply.
          </p>
          <p>
            When you ask us to open an Account, we or someone acting for us will ask for information about you and where the money you will put in your Account comes from. We do this for a number of reasons, including to check your credit score and identity, and to meet our legal and regulatory requirements.
          </p>
          <p>You can't:</p>
          <ul className="terms__list">
            <li>open more than one Planet Sayari Bank/PSB Personal Account;</li>
            <li>use a Planet Sayari Bank/PSB Personal Account for business purposes; or</li>
            <li>open a new Planet Sayari Bank/PSB Personal Account if we've previously closed a Planet Sayari Bank/PSB Personal Account in your name.</li>
          </ul>

          <h2 id="section5">5. How do I get information on payments into and out of my Account?</h2>
          <p>
            You can check all payments into and out of your Account through the Planet Sayari Bank/PSB app. We will not make any changes to your Account information. It will be available to you through the Planet Sayari Bank/PSB app while you are a customer.
          </p>
          <p>
            We will send a notification to your mobile device each time a payment goes into or out of your Account. You can turn off these notifications, but if you do, you should regularly check your payments on the Planet Sayari Bank/PSB app.
          </p>

          <h2 id="section6">6. Account Security and Access</h2>
          <p>
            You must keep your Account secure. This means you must:
          </p>
          <ul className="terms__list">
            <li>keep your security details safe;</li>
            <li>not let anyone else use your Account;</li>
            <li>take reasonable steps to prevent your Account being used fraudulently; and</li>
            <li>contact us as soon as possible if you think someone else has accessed your Account or your security details have been compromised.</li>
          </ul>
          <p>
            We may block your access to your Account or to our services if we're reasonably concerned about:
          </p>
          <ul className="terms__list">
            <li>the security of your Account or security details;</li>
            <li>unauthorized or fraudulent use of your Account; or</li>
            <li>any applicable legal or regulatory requirements.</li>
          </ul>

          <h2 id="section7">7. Fees and Charges</h2>
          <p>
            Our fees are set out in our Fees Page. We'll let you know about any fees before we charge them. Some of our fees might change over time. You can always see our current fees in the Fees Page.
          </p>
          <p>
            We may deduct any fees or other amounts that you owe us from your Account. If you don't have enough money in your Account to pay a fee or other amount that you owe us, we may:
          </p>
          <ul className="terms__list">
            <li>deduct the amount from any money that is paid into your Account later;</li>
            <li>take the amount from any other account you have with us; or</li>
            <li>ask you to pay us the amount in some other way.</li>
          </ul>

          <h2 id="section8">8. Making Changes to Your Account</h2>
          <p>
            We may make changes to these Terms, including our fees, for any of the following reasons:
          </p>
          <ul className="terms__list">
            <li>to make them clearer or more favorable to you;</li>
            <li>to reflect changes in our business, our products or services, or our systems;</li>
            <li>to reflect changes in market conditions or industry practice;</li>
            <li>to reflect changes in the law, regulatory requirements, or industry guidance;</li>
            <li>to reflect changes in our costs of running the business; or</li>
            <li>to reflect changes in your circumstances.</li>
          </ul>

          <h2 id="section9">9. Closing Your Account</h2>
          <p>
            You can close your Account at any time by contacting us. We may also close your Account by giving you at least two months' notice. In some situations, we may close or suspend your Account immediately if:
          </p>
          <ul className="terms__list">
            <li>we suspect you're using your Account for fraudulent or illegal purposes;</li>
            <li>you've given us false or misleading information;</li>
            <li>you haven't provided us with information we've asked for;</li>
            <li>you've broken these Terms in a serious or persistent way;</li>
            <li>you're no longer eligible for an Account;</li>
            <li>we have to do so by law; or</li>
            <li>you've been declared bankrupt.</li>
          </ul>

          <h2 id="section10">10. Data Protection and Privacy</h2>
          <p>
            We take the protection of your personal data seriously. We will only use your personal data as set out in our Privacy Policy. You can find our Privacy Policy on our website or request a copy through the Planet Sayari Bank/PSB app.
          </p>
          <p>
            By accepting these Terms, you agree that:
          </p>
          <ul className="terms__list">
            <li>we can use your personal data as set out in our Privacy Policy;</li>
            <li>we can share your personal data with our service providers and partners;</li>
            <li>we can transfer your personal data outside your country of residence; and</li>
            <li>we can contact you about our products and services.</li>
          </ul>

          <h2 id="section11">11. Investment Services and Risks</h2>
          <p>
            Planet Sayari Bank/PSB provides various investment services. Before using these services, you should understand:
          </p>
          <ul className="terms__list">
            <li>All investments carry risk, and you may lose your investment;</li>
            <li>Past performance is not a reliable indicator of future results;</li>
            <li>The value of investments can go down as well as up;</li>
            <li>We do not provide investment advice - you make your own investment decisions;</li>
            <li>You should not invest more than you can afford to lose.</li>
          </ul>

          <h2 id="section12">12. Complaints</h2>
          <p>
            If you're unhappy with our service, please contact us first through the Planet Sayari Bank/PSB app or by email at complaints@planetsayaribank.com. We'll try to resolve your complaint as quickly as possible.
          </p>
          <p>
            If you're still not happy after we've tried to resolve your complaint, you may be able to refer it to the Financial Ombudsman Service.
          </p>

          <h2 id="section13">13. Our Legal Responsibility</h2>
          <p>
            We are responsible for losses you suffer as a result of us breaking these Terms, but we are not responsible for:
          </p>
          <ul className="terms__list">
            <li>losses not caused by our breach or negligence;</li>
            <li>losses caused by abnormal or unforeseeable circumstances beyond our control;</li>
            <li>losses caused by us having to comply with applicable laws; or</li>
            <li>indirect losses (such as loss of profits or opportunity).</li>
          </ul>

          <h2 id="section14">14. Transfer of Rights</h2>
          <p>
            You cannot transfer any rights or obligations you have under these Terms to anyone else. We can transfer our rights and obligations under these Terms to another company by giving you two months' notice. If we do this, your rights under these Terms will not be affected.
          </p>

          <h2 id="section15">15. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Union of Comoros. Any dispute will be dealt with by the courts of the Union of Comoros.
          </p>

          <h2 id="section16">16. Contact Information</h2>
          <p>
            You can contact us in the following ways:
          </p>
          <ul className="terms__list">
            <li>Through the Planet Sayari Bank/PSB app</li>
            <li>By email at support@planetsayaribank.com</li>
            <li>By post at: Hamchako, Mutsamudu, The Autonomous Island of Anjouan, Union of Comoros</li>
          </ul>
          <p>
            These Terms were last updated on May 15, 2024. You can download a copy of these Terms at any time through the Planet Sayari Bank/PSB app.
          </p>

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

export default Terms; 