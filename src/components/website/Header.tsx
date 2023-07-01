import React from 'react';

export interface HeaderProps {
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
        color: props.color || 'var(--dark)',
        marginTop: 0,
        marginBottom: '3rem',
        width: '100%',
        userSelect: 'none',
        ...props.style,
      }}
    >
      {props.children}
      <span style={{ width: '20%', borderBottom: `3px solid ${props.color || 'var(--dark)'}`, marginTop: '0.75rem' }}></span>
    </h1>
  );
}
