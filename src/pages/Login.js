import React, { useState, useContext } from 'react';
//strapi function
import loginUser from '../strapi/loginUser';
import registerUser from '../strapi/registerUser';
//handle user
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';

//
export default function Login() {
  const history = useHistory();
  //setup user context
  const { userLogin, alert, showAlert } = useContext(UserContext);

  //
  // state value
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('default');
  const [isMember, setIsMember] = useState(true);

  // doing the is empty the opposit way sice the state is emapty at first
  let isEmpty = !email || !password || !username || alert.show;

  const toogleMember = () => {
    setIsMember((preMember) => {
      // settin it to oposit of wat we already have
      let isMember = !preMember;
      isMember ? setUsername('default') : setUsername('');
      return isMember;
    });
  };

  const handleSubmit = async (e) => {
    // /alert
    showAlert({
      msg: 'accessing user data. please wait..',
    });
    e.preventDefault();
    let response;
    if (isMember) {
      // response = await loginUser
      response = await loginUser({ email, password });
    } else {
      // response = await registerUser
      response = await registerUser({ email, password, username });
    }
    if (response) {
      //
      const {
        jwt: token,
        user: { username },
      } = response.data;
      const newUser = { token, username };
      userLogin(newUser);
      showAlert({
        msg: `you are logged in : ${username}, continue shopping.`,
      });
      history.push('/products');
    } else {
      showAlert({
        msg: 'there was an error. please try again...',
        type: 'danger',
      });
      //show alert
    }
  };

  return (
    <section className='form section'>
      <h2 className='section-title'>{isMember ? 'sigin in' : 'register'}</h2>
      <form className='login-form'>
        {/* single input */}
        <div className='form-control'>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* end of singlr input */}

        {/* single input */}
        <div className='form-control'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* end of singlr input */}

        {/* single input */}
        {!isMember && (
          <div className='form-control'>
            <label htmlFor='username'>username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        {/* end of singlr input */}

        {/* empty form text */}
        {isEmpty && (
          <p className='form-empty'>please fill out all form fields</p>
        )}

        {/* submit button */}
        {!isEmpty && (
          <button
            type='submit'
            className='btn btn-block btn-primary'
            onClick={handleSubmit}
          >
            submit
          </button>
        )}

        {/* register link */}
        <p className='register-link'>
          {isMember ? 'need to register' : 'already a member'}
          <button type='button' onClick={toogleMember}>
            click here
          </button>
        </p>
      </form>
    </section>
  );
}
