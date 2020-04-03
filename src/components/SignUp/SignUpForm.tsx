import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  error: null,
};

const SignUpFormBase = (props: any) => {
  const [account, setAccount] = useState(INITIAL_STATE);
  const isInvalid =
    account.password === '' ||
    account.email === '' ||
    account.username === '';

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const res = await props.firebase.doCreateUserWithEmailAndPassword(account.email, account.password);
      const email = res.user.email;
      if (email) {
        props.history.push(ROUTES.HOME)
      }
    } catch (error) {
      setAccount({
        ...account,
        error: error.message
      })
    }
  }

  const onChange = (event: { target: { name: string, value: string } }) => {
    const { name, value } = event.target;
    setAccount({
      ...account,
      [name]: value
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={account.username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={account.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={account.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button type="submit" disabled={isInvalid}>Sign Up</button>
      {account.error}
      <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </p>
    </form>
  )
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;