import React, { Suspense, useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { classes, media, style } from 'typestyle';
import useResizeObserver from 'use-resize-observer';

import { useFocusLock } from '../../hooks/useFocusLock';
import { useLocation } from '../../hooks/useLocation';
import { headerHeight } from '../../util/globalState';
import { adminStorageKey } from '../../util/localStorageKeys';
import { mobileBreakpoint } from '../../util/styles';
import { AdminNavLazy } from '../LazyComponents';

const links = [
  { id: '#home', label: 'Home' },
  { id: '#services', label: 'Services' },
  { id: '#our-work', label: 'Our Work' },
  { id: '#about-us', label: 'About Us' },
  { id: '#contact', label: 'Contact' },
];

const headerStyle = style({
  position: 'sticky',
  top: -1,
  zIndex: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  background: 'var(--dark)',
  color: 'var(--light)',
});

const wrapperStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  maxWidth: 'var(--max-width)',
  width: '100%',
  boxSizing: 'border-box',
});

const mobileStyle = media(
  { maxWidth: mobileBreakpoint },
  {
    position: 'fixed',
    inset: '0 0 0 max(20%, calc(100vw - 350px))',
    flexDirection: 'column',
    padding: 'min(30vh, 6rem) 3rem',
    fontSize: '1.5rem',
    gap: '1.5rem',
    background: 'rgba(30, 30, 30, 0.85)',
    transform: 'translateX(100%)',
    willChange: 'transform',
    transition: 'transform 0.3s ease-in-out',

    $nest: {
      '@supports (backdrop-filter: blur(1rem))': {
        backdropFilter: 'blur(1rem)',
        background: 'rgba(30, 30, 30, 0.65)',
      },

      '&[data-visible="true"]': {
        transform: 'translateX(0)',
      },

      '&[data-visible="false"] a': {
        display: 'none',
      },
    },
  }
);

const desktopStyle = media({ minWidth: mobileBreakpoint }, {});

const ulStyle = style(
  {
    display: 'flex',
    gap: '1rem',
    listStyle: 'none',
    padding: 0,
    margin: 0,

    $nest: {
      a: {
        textDecoration: 'none',
        color: 'var(--light)',
        whiteSpace: 'nowrap',
        borderRadius: '0.05rem',
      },
    },
  },

  desktopStyle,
  mobileStyle
);

const menuButtonStyle = style(
  {
    background: 'none',
    border: 'none',
    padding: 0,
    display: 'none',
    position: 'absolute',
    top: '1.25rem',
    right: '1rem',
    zIndex: 5,
  },
  media({ maxWidth: mobileBreakpoint }, { display: 'flex' })
);

const navStyle = style(
  media(
    { maxWidth: mobileBreakpoint },
    {
      opacity: 0,
      transition: 'all 0.15s',
    }
  )
);

const openStyle = style(
  media(
    { maxWidth: mobileBreakpoint },
    {
      width: '100%',
      height: '100%',
      position: 'fixed',
      inset: '0 0 0 0',
      background: 'rgba(0, 0, 0, 0.85)',
      opacity: 1,
    }
  )
);

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [globalHeight, setGlobalHeight] = headerHeight.use();
  const { ref: headerRef, height } = useResizeObserver<HTMLDivElement>({
    box: 'border-box',
  });

  const { adminMode, hash } = useLocation();
  const containerRef = useFocusLock(menuOpen);

  useEffect(() => {
    document.body.style.scrollPaddingTop = height + 'px';
    setGlobalHeight(height);
  }, [height]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, []);

  return (
    <header ref={headerRef} className={headerStyle}>
      <div className={wrapperStyle} ref={containerRef}>
        <h1 style={{ margin: 0 }}>Rusty Rollers Restoration</h1>

        <button
          aria-label="Menu"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          className={menuButtonStyle}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <nav
          className={classes(menuOpen && openStyle, navStyle)}
          onClick={(e) => {
            const okTags = ['A', 'UL', 'LI'];
            if (!okTags.includes((e.target as HTMLElement).tagName)) setMenuOpen(false);
          }}
        >
          <ul id="primary-navigation" data-visible={menuOpen} className={ulStyle}>
            {links.map(({ id, label }) => (
              <li key={id}>
                <a href={id} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              </li>
            ))}

            {(import.meta.env.DEV || window.localStorage.getItem(adminStorageKey)) && !adminMode && (
              <a
                href="#/admin"
                style={{
                  color: 'var(--warning)',
                  marginTop: menuOpen ? '2rem' : undefined,
                  marginLeft: menuOpen ? undefined : '2rem',
                }}
              >
                Admin Page
              </a>
            )}
          </ul>
        </nav>
      </div>

      {adminMode && (
        <Suspense>
          <AdminNavLazy />
        </Suspense>
      )}
    </header>
  );
}
