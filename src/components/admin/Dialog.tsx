import React, { ReactNode, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { media, style } from 'typestyle';

import { useFocusLock } from '../../hooks/useFocusLock';
import { mobileBreakpoint } from '../../util/styles';

interface DialogProps {
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
}

const dialogStyle = style(
  {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '90vh',
    width: '85vw',
    background: 'var(--light)',
    position: 'relative',
  },
  media({ maxWidth: mobileBreakpoint }, { width: '100vw', height: '100dvh', maxHeight: '100dvh' })
);

const closeStyle = style({
  display: 'flex',
  padding: '0.75rem',
  position: 'absolute',
  right: '0.5rem',
  background: 'none',
  border: 'none',
  outlineColor: 'var(--light)',
  outlineOffset: '-6px',
});

export function Dialog(props: DialogProps) {
  const dialogRef = useFocusLock();

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
        height: '100dvh',
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 10,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          props.onClose();
          e.stopPropagation();
          e.preventDefault();
        }
      }}
      ref={dialogRef}
    >
      <div className={dialogStyle}>
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
          <button onClick={() => props.onClose()} className={closeStyle}>
            <FaTimes />
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
