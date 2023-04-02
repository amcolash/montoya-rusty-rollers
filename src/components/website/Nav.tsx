import React from 'react';
import { Link } from 'react-router-dom';
import { media, style } from 'typestyle';
import { TextId } from './EditableText';

const navStyle = style(
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '0.75rem 1rem',
    color: '#eee',
    background: '#333',
    marginRight: '-1.25rem',
    width: 'calc(100% - 2rem)',

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
  },
  media({ maxWidth: 915 }, { justifyContent: 'center' })
);

export function Nav() {
  return (
    <nav className={navStyle}>
      <h1 style={{ margin: 0, textAlign: 'center' }}>Montoya Rusty Rollers Restoration</h1>
      <ul>
        {import.meta.env.DEV && location.pathname === '/' && (
          <li>
            <Link to="/admin" style={{ color: '#e3bd24' }}>
              Admin Page
            </Link>
          </li>
        )}
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
