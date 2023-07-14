import { getAuth } from 'firebase/auth';
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import { useLocation } from '../../hooks/useLocation';
import { app } from '../../util/firebase';
import { EditState, editingState } from '../../util/globalState';
import { IconButton } from '../IconButton';

export function AdminNav() {
  const auth = getAuth(app);
  const { adminMode } = useLocation();
  const [editState] = editingState.use();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--warning)',
        padding: '0.5rem',
        color: 'var(--dark)',
        gap: '1rem',
        boxSizing: 'border-box',
      }}
    >
      {adminMode && (
        <>
          <h3 style={{ margin: 0 }}>[ADMIN MODE]</h3>

          <div style={{ flex: 1, textAlign: 'center' }}>
            {editState === EditState.None && 'All Changes Saved'}
            {editState === EditState.Saving && 'Saving Changes...'}
            {editState === EditState.Error && 'Error Saving Changes'}
          </div>

          <a href="/" style={{ color: 'var(--dark)', fontStyle: 'italic' }}>
            Exit Admin
          </a>
          {import.meta.env.DEV && (
            <IconButton icon={<FaSignOutAlt />} onClick={() => auth.signOut()}>
              <span>Logout</span>
            </IconButton>
          )}
        </>
      )}
    </div>
  );
}
