import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav } from './Nav';

export function Website() {
  const location = useLocation();

  return (
    <div>
      {import.meta.env.DEV && location.pathname === '/' && (
        <Link to="/admin" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          Admin
        </Link>
      )}
      <Nav />
    </div>
  );
}
