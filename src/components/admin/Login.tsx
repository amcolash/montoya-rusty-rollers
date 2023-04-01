import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { style } from 'typestyle';

import { auth } from '../../util/firebase';

const provider = new GoogleAuthProvider();

const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
});

export function Login() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <div className={container}>Loading...</div>;
  if (error) return <div className={container}>An error occurred: {error.message}</div>;

  if (!user)
    return (
      <div className={container}>
        <h2>To access this page, you need to login</h2>
        <GoogleLoginButton onClick={() => signInWithPopup(auth, provider)} style={{ width: 'fit-content' }} />

        <Link to="/" style={{ marginTop: '4rem' }}>
          Return to Website
        </Link>
      </div>
    );

  return null;
}
