import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../util/firebase';
import { Header } from './Header';
import { Login } from './Login';
import { Website } from '../website/Website';

export function Admin() {
  const [user, loading, error] = useAuthState(auth);

  if (!user || loading || error) return <Login />;

  return (
    <div>
      <Header />
      <Website />
    </div>
  );
}
