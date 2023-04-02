import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { style } from 'typestyle';

import { auth } from '../../util/firebase';

const header = style({
  padding: '1rem',
  width: 'calc(100% - 2rem)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#e3bd24',
  borderBottom: '4px solid white',

  $nest: {
    h3: {
      margin: 0,
    },
  },
});

export function Header() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  if (user) {
    return (
      <div className={header}>
        <h3>Rusty Rollers Restoration</h3>
        <h3>[Admin Mode]</h3>
        <button
          onClick={() => {
            auth.signOut();
            navigate('/');
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  return null;
}
