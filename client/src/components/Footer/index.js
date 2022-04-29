import React from 'react';
import styles from './footer.module.css';



// const Footer = () => {
//   return (
//     <footer className="w-100 mt-auto bg-secondary p-4">
//       <div className="container">
//         &copy;{new Date().getFullYear()} by Brew Buddy

//         <a href ="https://github.com/WardVanlaar/BrewBuddy">
//         <i className = 'fab fa-github'></i>
//       </a>
//       <a href ="https://www.linkedin.com/in/veeditparikh2211/">
//         <i className = 'fab fa-linkedin'></i>
//       </a>
//       </div>
     
//     </footer>
//   );
// };

// export default Footer;

const Footer = () => {
  return (
      <div className={styles.footer_container}>
        <p>Copyright @ 2022 Brew Buddy.</p>
        <p>Privacy Policy</p>
        <a href='https://github.com/WardVanlaar/BrewBuddy'>
          <i className='fab fa-github'></i>
         
        </a>
        <a href='https://www.linkedin.com/in/veeditparikh2211/'>
          <i className='fab fa-linkedin'></i>
        </a>
        <p>Terms of Use</p>
        <p>United States</p>
      </div>
  );
};

export default Footer;