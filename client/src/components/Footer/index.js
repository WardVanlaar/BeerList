import React from 'react';
import styles from './footer.module.css';

const Footer = () => {
  return (
      <div className={styles.footer_container}>
        <p>Copyright @ 2022 Brew Buddy.</p>
        <p>Contact Us:</p>
        <a href='https://github.com/WardVanlaar/BrewBuddy'>
        <img
        src="/github.png"
        width="20"
        height="20"
        className="d-inline-block align-top"
        alt="Github"
      />
        </a>
        <a href='https://www.linkedin.com/in/veeditparikh2211/'>
        <img
        src="/linkedin.png"
        width="20"
        height="20"
        className="d-inline-block align-top"
        alt="Linkedin"
      />
        </a>
        <p>United States</p>
      </div>
  );
};

export default Footer;