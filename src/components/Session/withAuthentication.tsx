import React, { useState, useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = (Component: any) => (props: any) => {
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
      <Component {...props} />
    </AuthUserContext.Provider>
  )
}

export default withFirebase(withAuthentication);