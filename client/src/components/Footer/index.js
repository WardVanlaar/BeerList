import React from 'react';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container font-link text-center">
        &copy;{new Date().getFullYear()} by VWJC Brewery
      </div>
    </footer>
  );
};

export default Footer;
