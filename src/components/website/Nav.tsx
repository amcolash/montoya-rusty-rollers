import { DesktopList, MobileList, Navbar } from 'accessible-navbar';
import React, { Suspense, useEffect } from 'react';
import { classes, style } from 'typestyle';
import useResizeObserver from 'use-resize-observer';

import { useLocation } from '../../hooks/useLocation';
import { headerHeight } from '../../util/globalState';
import { AdminNavLazy } from '../LazyComponents';

// const navStyle = style({
//   display: 'flex',
//   justifyContent: 'space-around',
//   alignItems: 'center',
//   flexWrap: 'wrap',
//   marginRight: '-1.25rem',
//   width: '100%',
//   maxWidth: 'calc(var(--max-width) + 200px)',

//   $nest: {
//     '& ul': {
//       display: 'flex',
//       justifyContent: 'center',
//       flexWrap: 'wrap',
//       listStyle: 'none',
//       gap: '0.25rem 0.75rem',
//       margin: '0.5rem 0',
//       padding: 0,
//     },
//     '&: li': {
//       textAlign: 'center',
//     },
//     '& a': {
//       textAlign: 'center',
//       display: 'flex',
//       textDecoration: 'none',
//       fontWeight: 'bold',
//       color: '#bbb',
//       transition: 'color 0.35s',
//       padding: '0.35rem 0.75rem',

//       $nest: {
//         '&:hover': {
//           color: 'var(--light)',
//         },

//         '&.active': {
//           color: 'red',
//         },
//       },
//     },
//   },
// });

const navStyle = style({
  height: '85px !important',
  padding: '0 20px !important',

  $nest: {
    '& a': {
      fontSize: '1.2rem',
    },
    '& [aria-label="open mobile menu"]': {
      display: 'flex',
    },
  },
});

const mobileStyle = style({
  zIndex: '4 !important',

  $nest: {
    '& a': {
      fontSize: '2.5rem',
    },
    '& [aria-label="close mobile menu"]': {
      top: '20px',
      right: '20px',
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
        zIndex: 3,
      }}
    >
      <Navbar
        applicationNodeId="root"
        brand="Montoya Rusty Rollers Restoration"
        desktopList={(props) => <DesktopList {...props} className={navStyle} />}
        mobileList={(props) => <MobileList {...props} className={mobileStyle} />}
        c="var(--light)"
        bc="var(--dark)"
        hc="var(--cta)"
      >
        {links.map(({ id, label }) => (
          <a href={id} key={id} className={classes(hash === id ? 'active' : '')}>
            {label}
          </a>
        ))}

        {import.meta.env.DEV && !adminMode && (
          <a href="#/admin" style={{ color: 'var(--warning)' }}>
            Admin Page
          </a>
        )}
      </Navbar>

      {adminMode && (
        <Suspense>
          <AdminNavLazy />
        </Suspense>
      )}
    </header>
  );
}
