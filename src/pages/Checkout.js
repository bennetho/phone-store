import React, { useContext, useState } from 'react';
import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';
import EmptyCart from '../components/Cart/EmptyCart';
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements';
import submitOrder from '../strapi/submitOrder';

export function Checkout(props) {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = useContext(UserContext);
  const history = useHistory();
  // state values
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const isEmpty = !name || alert.show;

  async function handleSubmit(e) {
    showAlert({ msg: 'submitting order...please wait' });
    e.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch((error) => console.log(error));

    const { token } = response;
    if (token) {
      setError('');
      const { id } = token;
      let order = await submitOrder({
        name: name,
        total: total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      });

      if (order) {
        showAlert({ msg: 'your order is complete' });
        clearCart();
        history.push('/');
        return;
      } else {
        showAlert({
          msg: 'there was an error with your order...try again',
          type: 'danger',
        });
      }
    } else {
      hideAlert();
      setError(response.error.message);
    }
  }

  if (cart.length < 1) return <EmptyCart />;

  return (
    <section className='section form'>
      <h2 className='section-title'>checkout</h2>
      <form className='checkout-form'>
        <h3>
          order total : <span>£{total}</span>
        </h3>
        {/* single input */}
        <div className='form-control'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        {/* end of single input */}

        {/* card element */}
        <div className='stripe-input'>
          <label htmlFor='card-element'>Credit or Debit Card</label>
          <br />
          <p className='stripe-info'>
            Test using this credit card : <span>4000 0062 0000 0007</span>
            <br />
            enter any 3 digits for the CVC
          </p>
        </div>
        {/* end card element */}
        {/* STRIPE ELEMENT */}
        <CardElement className='card-element'></CardElement>
        {/* Stripe errors */}
        {error && <h4 className='form-empty'>{error}</h4>}
        {/* empty value */}
        {isEmpty ? (
          <h4 className='form-empty'>please fill out name field</h4>
        ) : (
          <button
            type='submit'
            className='btn btn-primary btn-block'
            onClick={handleSubmit}
          >
            submit
          </button>
        )}
      </form>
    </section>
  );
}
const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey='pk_test_51HLCHcJHCt1bt1QTzPlKST0HZ2gIzDTnAgyOUVAKks3y23y6PY1SIux6XPPALUBdeRt7knWQUgXOwQ3Hlng4K4k400zMH06bRa'>
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  );
};
export default StripeWrapper;
