import React from 'react';
import { keyframes, style } from 'typestyle';

import { ImageId } from '../EditableImage';
import { EditableText, TextId } from '../EditableText';
import { Page } from '../Page';

const bannerAnimation = keyframes({
  '0%': { transform: 'translateX(200%)' },
  '100%': { transform: 'translateX(0)' },
});

const bannerStyle = style({
  position: 'absolute !important',
  top: 'calc(min(1vw, 2rem) + 3rem)',
  right: 'min(3vw, 3rem)',

  color: 'white',
  textShadow: '0.1rem 0.1rem 0.25rem var(--dark)',
  textTransform: 'uppercase',
  textAlign: 'right',
  fontSize: 'max(2rem, min(5vw, 4.5rem))',
  fontWeight: '500',
  maxWidth: 'max(300px, min(60vw, 800px))',

  transform: 'translateX(200%)',
  willChange: 'transform',
  animation: `${bannerAnimation} 1s ease-out forwards 0.5s`,
});

export function Banner() {
  return (
    <Page id="home" image={ImageId.header}>
      <EditableText id={TextId.banner} className={bannerStyle} readonly={true} />
    </Page>
  );
}
