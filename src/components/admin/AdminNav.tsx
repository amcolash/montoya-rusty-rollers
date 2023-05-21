import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { EditState, editingState } from '../../util/globalState';
import { IconButton } from '../IconButton';
import { FaSignOutAlt } from 'react-icons/fa';
import { app } from '../../util/firebase';
import { getAuth } from 'firebase/auth';

export function AdminNav() {
  const auth = getAuth(app);
  const location = useLocation();
  const [editState] = editingState.use();

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

          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {editState === EditState.None && 'All Changes Saved'}
            {editState === EditState.Saving && 'Saving Changes...'}
            {editState === EditState.Error && 'Error Saving Changes'}

            {import.meta.env.DEV && (
              <IconButton icon={<FaSignOutAlt />} onClick={() => auth.signOut()} style={{ marginLeft: '1.5rem' }}>
                <span>Logout</span>
              </IconButton>
            )}
          </div>
        </>
      )}
    </div>
  );
}
