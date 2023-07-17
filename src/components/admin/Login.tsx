import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { style } from 'typestyle';

import { app } from '../../util/firebase';
import { attemptedLogin } from '../../util/globalState';
import { GoogleLoginButton } from './GoogleLoginButton';

const provider = new GoogleAuthProvider();

const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100dvh',
});

interface LoginProps {
  invalidUser: boolean;
}

export function Login(props: LoginProps) {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [hasAttemptedLogin, setHasAttemptedLogin] = attemptedLogin.use();

  useEffect(() => {
    setTimeout(() => {
      if (import.meta.env.DEV && !user && !hasAttemptedLogin) {
        signInWithPopup(auth, provider);
        setHasAttemptedLogin(true);
      }
    }, 250);
  }, [user, hasAttemptedLogin]);

  if (loading) return <div className={container}>Loading...</div>;
  if (error) return <div className={container}>An error occurred: {error.message}</div>;

  if (!user)
    return (
      <div className={container}>
        <h2>To access this page, you need to login</h2>
        {props.invalidUser && <h3 style={{ color: 'red' }}>You are not authorized to access this page</h3>}
        <GoogleLoginButton onClick={() => signInWithPopup(auth, provider)} style={{ width: 'fit-content' }} />

        <a href="/" style={{ marginTop: '4rem' }}>
          Return to Website
        </a>
      </div>
    );

  return null;
}
