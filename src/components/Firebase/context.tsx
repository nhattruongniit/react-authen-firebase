import React from 'react';

const initialState = {};

const FirebaseContext = React.createContext(initialState);

export const withFirebase = (Component: any) => (props: any) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export default FirebaseContext;