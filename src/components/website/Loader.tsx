import React from 'react';
import { keyframes, style } from 'typestyle';

import { ReactComponent as Dust } from '../../images/dust.svg';
import { ReactComponent as Truck } from '../../images/pickup-truck.svg';

interface LoaderProps {
  style?: React.CSSProperties;
}

const container = style({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'var(--background)',
  zIndex: 2,
});

const truckAnimation = keyframes({
  '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
  '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
  '20%': { transform: 'translate(-3px, 0px) rotate(1deg)' },
  '30%': { transform: 'translate(3px, 2px) rotate(0deg)' },
  '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
  '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
  '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
  '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
  '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
  '90%': { transform: 'translate(1px, 2px) rotate(0deg)' },
  '100%': { transform: 'translate(1px, 1px) rotate(0deg)' },
});

const truckStyle = style({
  animation: `${truckAnimation} 2s linear infinite`,
  width: 250,
  height: 250,
  color: 'var(--primary)',
});

const dustAnimation = keyframes({
  '0%': { transform: 'scale(1)', opacity: 0.5 },
  '30%': { transform: 'scale(0.65)' },
  '50%': { transform: 'scale(0.35)', opacity: 0 },
  '70%': { transform: 'scale(0.7)' },
  '100%': { transform: 'scale(1)', opacity: 0.5 },
});

const dustStyle = style({
  animation: `${dustAnimation} linear infinite`,
  width: 75,
  height: 75,
  position: 'absolute',
  zIndex: -1,
  color: '#aaa',
});

// Loader from Nikita Hlopov: https://codepen.io/nikitahl/pen/MZdZqa
export function Loader(props: LoaderProps) {
  const clouds = [];
  for (let i = 0; i < 15; i++) {
    clouds.push(
      <Dust
        key={i}
        className={dustStyle}
        style={{
          top: `calc(50% + 15px - ${Math.random() * 25 - 12}px)`,
          left: `calc(50% - 150px - ${Math.random() * 150 - 75}px`,
          animationDuration: `${Math.random() * 0.5 + 1.5}s`,
          rotate: `${Math.random() * 360}deg`,
          animationDelay: `${Math.random()}s`,
          opacity: 0,
        }}
      />
    );
  }

  return (
    <div className={container} style={props.style}>
      <Truck className={truckStyle} />

      {clouds}
    </div>
  );
}
