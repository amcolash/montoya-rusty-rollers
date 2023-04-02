import React from 'react';
import { classes, style } from 'typestyle';

const page = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  boxSizing: 'border-box',
  scrollSnapAlign: 'start',
  padding: '1rem',
});

interface PageProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function Page(props: PageProps) {
  return (
    <div className={classes(page, props.className)} style={props.style}>
      {props.children}
    </div>
  );
}
