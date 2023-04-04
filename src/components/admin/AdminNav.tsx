import { getAuth } from 'firebase/auth';
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { app } from '../../util/firebase';

export function AdminNav() {
  const auth = getAuth(app);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--warning)',
        margin: '-1rem',
        marginTop: '1rem',
        padding: '0.5rem',
        color: 'var(--background)',
        gap: '1rem',
      }}
    >
      {import.meta.env.DEV && location.pathname === '/' && (
        <Link to="/admin" style={{ color: 'var(--background)' }}>
          Admin Page
        </Link>
      )}
      {location.pathname.includes('/admin') && (
        <>
          <h3 style={{ margin: 0 }}>[ADMIN MODE]</h3>
          <Link to="/" style={{ color: 'var(--background)', fontStyle: 'italic' }}>
            Exit Admin
          </Link>
          <button onClick={() => auth.signOut()} style={{ display: 'flex', gap: '0.25rem' }}>
            <span>Logout</span>
            <FaSignOutAlt />
          </button>
        </>
      )}
    </div>
  );
}
