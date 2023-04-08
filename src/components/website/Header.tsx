import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  color?: string;
}

export function Header(props: HeaderProps) {
  return (
    <h1
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        color: props.color || 'var(--background)',
        ...props.style,
      }}
    >
      {props.children}
      <span style={{ width: '20%', borderBottom: `3px solid ${props.color || 'var(--background)'}`, marginTop: '0.75rem' }}></span>
    </h1>
  );
}
