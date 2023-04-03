import React from 'react';
import { classes, style } from 'typestyle';

import { headerHeight } from '../../util/globalState';

interface PageProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}

export function Page(props: PageProps) {
  const height = headerHeight.useValue();

  const page = style({
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100vh - ${height || 0}px)`,
    boxSizing: 'border-box',
    scrollSnapAlign: 'start',
    padding: '1rem',
  });

  return (
    <div id={props.id} className={classes(page, props.className)} style={props.style}>
      {props.children}
    </div>
  );
}
