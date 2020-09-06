import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <section>
      <div className='error-container'>
        <h1>opps! its a dead end</h1>
        <Link to='/' className='btn btn-primary'>
          back to home
        </Link>
      </div>
    </section>
  );
}
