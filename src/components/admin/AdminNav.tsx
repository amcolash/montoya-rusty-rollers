import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

import { useLocation } from '../../hooks/useLocation';
import { app } from '../../util/firebase';
import { EditState, editingState } from '../../util/globalState';
import { IconButton } from '../IconButton';

export function AdminNav() {
  const auth = getAuth(app);
  const { adminMode } = useLocation();
  const [editState] = editingState.use();

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    if (editState !== EditState.None) window.addEventListener('beforeunload', handler);
    else window.removeEventListener('beforeunload', handler);

    return () => window.removeEventListener('beforeunload', handler);
  }, [editState]);

  return (
    <div
      style={{
        width: '100%',
        background: 'var(--warning)',
        color: 'var(--dark)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {adminMode && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: 'var(--max-width)',
            padding: '0.5rem',
            gap: '1rem',
            boxSizing: 'border-box',
          }}
        >
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
        </div>
      )}
    </div>
  );
}
