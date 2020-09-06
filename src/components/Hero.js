import React from 'react';

export default function Hero({ children }) {
  return (
    <div className='hero'>
      <div className='banner'>
        <h1>smart phone store</h1>
        <p>order yours now - on discount</p>
        {children}
      </div>
    </div>
  );
}
