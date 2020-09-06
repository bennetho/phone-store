import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/user';

export default function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={() => {
        return user.token ? children : <Redirect to='/login'></Redirect>;
      }}
    ></Route>
  );
}

// using privatrRoute to redirect user to login so as to prevent them from bypssing the check out page
