import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className='icon-social social-footer'>
        <a href='https://www.facebook.com'>
          <i className='fab fa-facebook'></i>
        </a>
        <a href='https://www.instagram.com'>
          <i className='fab fa-instagram'></i>
        </a>
        <a href='https://www.google.com'>
          <i className='fab fa-google'></i>
        </a>
        <a href='https://www.twitter.com'>
          <i className='fab fa-twitter'></i>
        </a>
      </div>
      <p className='copyright'> COPYRIGHT&copy; 2020 ALL RIGHTS RESERVED.</p>
    </footer>
  );
};

export default Footer;
