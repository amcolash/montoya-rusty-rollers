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
        margin: '0 -1rem -0.75rem',
        marginTop: '1rem',
        padding: '0.5rem',
        color: 'var(--dark)',
        gap: '1rem',
        width: 'calc(100vw - 2rem)',
      }}
    >
      {adminMode && (
        <>
          <h3 style={{ margin: 0 }}>[ADMIN MODE]</h3>
          <a href="/" style={{ color: 'var(--dark)', fontStyle: 'italic' }}>
            Exit Admin
          </a>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
