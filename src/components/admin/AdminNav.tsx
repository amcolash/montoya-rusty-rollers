import { getAuth } from 'firebase/auth';
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { app } from '../../util/firebase';
import { IconButton } from '../IconButton';

export function AdminNav() {
  const auth = getAuth(app);
  const location = useLocation();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--warning)',
        margin: '0 -1rem -0.75rem',
        marginTop: '1rem',
        padding: '0.5rem',
        color: 'var(--dark)',
        gap: '1rem',
      }}
    >
      {import.meta.env.DEV && location.pathname === '/' && (
        <Link to="/admin" style={{ color: 'var(--dark)' }}>
          Admin Page
        </Link>
      )}
      {location.pathname.includes('/admin') && (
        <>
          <h3 style={{ margin: 0 }}>[ADMIN MODE]</h3>
          <Link to="/" style={{ color: 'var(--dark)', fontStyle: 'italic' }}>
            Exit Admin
          </Link>
          <IconButton
            icon={<FaSignOutAlt />}
            onClick={() => auth.signOut()}
            style={{ display: 'flex', gap: '0.25rem', marginLeft: '1.5rem' }}
          >
            <span>Logout</span>
          </IconButton>
        </>
      )}
    </div>
  );
}
