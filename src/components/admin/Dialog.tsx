import React, { ReactNode, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface DialogProps {
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

export function Dialog(props: DialogProps) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') props.onClose();
    };
    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 2,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          props.onClose();
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <div style={{ width: '85vw', background: 'var(--light)', position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            background: 'var(--dark)',
            color: 'var(--light)',
            padding: '0.5rem',
          }}
        >
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{props.title}</h3>
          <button onClick={() => props.onClose()} style={{ position: 'absolute', right: '0.5rem', paddingTop: '0.2rem' }}>
            <FaTimes />
          </button>
        </div>

        <div
          style={{
            height: '85vh',
            overflowY: 'auto',
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}