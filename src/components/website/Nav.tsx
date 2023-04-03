import React, { useEffect } from 'react';
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
          color: '#eee',
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
      style={{ position: 'sticky', top: 0, zIndex: 1, boxSizing: 'border-box', padding: '0.75rem 1rem', color: '#eee', background: '#333' }}
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

      {import.meta.env.DEV && location.pathname === '/' && (
        <Link to="/admin" style={{ color: '#e3bd24' }}>
          Admin Page
        </Link>
      )}
      {location.pathname === '/admin' && (
        <>
          <Link to="/" style={{ color: '#e3bd24', fontStyle: 'italic', marginRight: '1rem' }}>
            Exit Admin
          </Link>
          <button onClick={() => auth.signOut()}>Logout</button>
        </>
      )}
    </header>
  );
}
