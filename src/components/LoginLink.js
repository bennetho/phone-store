import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';
import { CartContext } from '../context/cart';

export default function LoginLink() {
  const { user, userLogout } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);

  if (user.token) {
    return (
      <button
        className='login-btn'
        onClick={() => {
          userLogout();
          clearCart();
        }}
      >
        logout
      </button>
    );
  }
  return <Link to='/login'>login</Link>;
}
