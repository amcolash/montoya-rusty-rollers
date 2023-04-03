import React, { useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { style } from 'typestyle';
import useResizeObserver from 'use-resize-observer';
import { auth } from '../../util/firebase';
import { headerHeight } from '../../util/globalState';

const navStyle = style({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginRight: '-1.25rem',
  width: '100%',

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
          color: 'var(--primary)',
        },
      },
    },
  },
});

export function Nav() {
  const [globalHeight, setGlobalHeight] = headerHeight.use();
  const { ref, width, height } = useResizeObserver<HTMLDivElement>({
    box: 'border-box',
  });

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
        zIndex: 1,
        boxSizing: 'border-box',
        padding: '0.75rem 1rem',
        color: 'var(--primary)',
        background: 'var(--background)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <nav className={navStyle}>
        <h1 style={{ margin: 0, textAlign: 'center' }}>Montoya Rusty Rollers Restoration</h1>
        <ul>
          <li>
            <Link to="#">Home</Link>
          </li>
          <li>
            <Link to="#services">Services</Link>
          </li>
          <li>
            <Link to="#our-work">Our Work</Link>
          </li>
          <li>
            <Link to="#about-us">About Us</Link>
          </li>
          <li>
            <Link to="#contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {(import.meta.env.DEV || location.pathname === '/admin') && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--warning)',
            margin: '-1rem',
            marginTop: '1rem',
            padding: '0.5rem',
            color: 'var(--background)',
            gap: '1rem',
          }}
        >
          {import.meta.env.DEV && location.pathname === '/' && (
            <Link to="/admin" style={{ color: 'var(--background)' }}>
              Admin Page
            </Link>
          )}
          {location.pathname === '/admin' && (
            <>
              <h3 style={{ margin: 0 }}>[ADMIN MODE]</h3>
              <Link to="/" style={{ color: 'var(--background)', fontStyle: 'italic' }}>
                Exit Admin
              </Link>
              <button onClick={() => auth.signOut()} style={{ display: 'flex', gap: '0.25rem' }}>
                <span>Logout</span>
                <FaSignOutAlt />
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
