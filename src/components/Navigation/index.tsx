import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTERS from '../../constants/routes';

import { AuthUserContext } from '../Session';

// component
import SignOut from '../SignOut';

const NavigationAuth = () => {
  return (
    <ul>
      <li>
        <Link to={ROUTERS.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTERS.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTERS.ACCOUNT}>Account</Link>
      </li>
      <li>
        <SignOut />
      </li>
    </ul>
  )
}

const NavigationNonAuth = () => {
  return (
    <ul>
      <li>
        <Link to={ROUTERS.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTERS.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  )
}

const Navigation = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
    // <div>
    //   {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    // </div>
  )
};

export default Navigation;