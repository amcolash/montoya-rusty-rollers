import React from 'react';
import { Link } from 'react-router-dom';
import { style } from 'typestyle';

const navStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.75rem 1rem',
  color: '#eee',
  background: '#333',
  marginRight: '-1.25rem',

  $nest: {
    '& ul': {
      display: 'flex',
      listStyle: 'none',
      // gap: '0.75rem',
      margin: 0,
    },
    '& a': {
      textDecoration: 'none',
      fontWeight: 'bold',
      color: '#bbb',
      transition: 'color 0.35s',
      padding: '0.75rem',

      $nest: {
        '&:hover': {
          color: '#eee',
        },
      },
    },
  },
});

export function Nav() {
  return (
    <nav className={navStyle}>
      <h1 style={{ margin: 0 }}>Montoya Rusty Rollers Restoration</h1>
      {import.meta.env.DEV && location.pathname === '/' && (
        <Link to="/admin" style={{ color: '#eee' }}>
          Admin Page
        </Link>
      )}
      <ul className={navStyle}>
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
  );
}
