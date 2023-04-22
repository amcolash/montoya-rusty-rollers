import React from 'react';

export function Footer() {
  return (
    <footer style={{ textAlign: 'center', scrollSnapAlign: 'end', background: 'var(--dark)', color: 'var(--light)', padding: '0.5rem' }}>
      Montoya Rusty Rollers Restoration, LLC © {new Date().getFullYear()}
    </footer>
  );
}
