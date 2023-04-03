import React from 'react';

interface HeaderProps {
  children: React.ReactNode;
}

export function Header(props: HeaderProps) {
  return <h1 style={{ borderBottom: '1px solid var(--background)' }}>{props.children}</h1>;
}
