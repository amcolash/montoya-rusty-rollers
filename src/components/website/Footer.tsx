import React from 'react';

export function Footer() {
  return (
    <footer style={{ textAlign: 'center', scrollSnapAlign: 'end' }}>
      Montoya Rusty Rollers Restoration, LLC © {new Date().getFullYear()}
    </footer>
  );
}
