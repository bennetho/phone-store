import React from 'react';
import { Link } from 'react-router-dom';
//impt
import PropTypes from 'prop-types';

import img from '../../assets/mainBcg.jpg';

export default function Product({ image, title, id, price }) {
  return (
    <article className='product'>
      <div className='img-container'>
        <img src={image || img} alt={title || 'default title'} />
        <Link to={`products/${id}`} className='btn btn-primary product-link'>
          details
        </Link>
      </div>
      <div className='product-footer'>
        <p className='product-title'>{title || 'default title'}</p>
        <p className='product-price'>£{price || 0}</p>
      </div>
    </article>
  );
}
Product.prototype = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
