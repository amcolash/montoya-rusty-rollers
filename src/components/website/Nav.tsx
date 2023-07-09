import React, { Suspense, useEffect } from 'react';
import { style } from 'typestyle';
import useResizeObserver from 'use-resize-observer';

import { useLocation } from '../../hooks/useLocation';
import { headerHeight } from '../../util/globalState';
import { AdminNavLazy } from '../LazyComponents';

const navStyle = style({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginRight: '-1.25rem',
  width: '100%',
  maxWidth: 'calc(var(--max-width) + 200px)',

  $nest: {
    '& ul': {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      gap: '0.25rem 0.75rem',
      margin: '0.5rem 0',
      padding: 0,
    },
    '&: li': {
      textAlign: 'center',
    },
    '& a': {
      textAlign: 'center',
      display: 'flex',
      textDecoration: 'none',
      fontWeight: 'bold',
      color: '#bbb',
      transition: 'color 0.35s',
      padding: '0.35rem 0.75rem',

      $nest: {
        '&:hover': {
          color: 'var(--light)',
        },

        '&.active': {
          color: 'red',
        },
      },
    },
  },
});

const links = [
  { id: '#home', label: 'Home' },
  { id: '#services', label: 'Services' },
  { id: '#our-work', label: 'Our Work' },
  { id: '#about-us', label: 'About Us' },
  { id: '#contact', label: 'Contact' },
];

export function Nav() {
  const [globalHeight, setGlobalHeight] = headerHeight.use();
  const { ref, height } = useResizeObserver<HTMLDivElement>({
    box: 'border-box',
  });
  const { adminMode, hash } = useLocation();

  useEffect(() => {
    document.body.style.scrollPaddingTop = height + 'px';
    setGlobalHeight(height);
  }, [height]);

  return (
    <header
      ref={ref}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxSizing: 'border-box',
        padding: '0.75rem 1rem',
        color: 'var(--light)',
        background: 'var(--dark)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <nav className={navStyle}>
        <h1 style={{ margin: 0, textAlign: 'center' }}>Montoya Rusty Rollers Restoration</h1>
        <ul>
          {links.map(({ id, label }) => (
            <li key={id}>
              <a href={id} className={hash === id ? 'active' : ''}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {import.meta.env.DEV && !adminMode && (
        <a href="#/admin" style={{ color: 'var(--warning)', position: 'absolute', right: '0.25rem', top: '3rem' }}>
          Admin Page
        </a>
      )}

      {adminMode && (
        <Suspense>
          <AdminNavLazy />
        </Suspense>
      )}
    </header>
  );
}
