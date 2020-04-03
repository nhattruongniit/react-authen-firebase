import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

// compoments
import Navigation from '../Navigation';
import LandingPage from '../Lading';
import SignUpPage from '../SignUp';
import SignInPage from '../Signin';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

const App = (props: any) => {
  const [authUser, setAuthUser] = useState<string>('');

  useEffect(() => {
    const listener = props.firebase.auth.onAuthStateChanged((auth: { email: string }) => {
      auth ? setAuthUser(auth.email) : setAuthUser('')
    })

    return () => {
      listener();
    }
  }, [props.firebase.auth])

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <Navigation />
        <hr />
        <Route path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </Router>

    </AuthUserContext.Provider>

  )
};

export default App;