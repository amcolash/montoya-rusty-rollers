import React from 'react';
import { classes, style } from 'typestyle';

import { headerHeight } from '../../util/globalState';
import { EditableImage, ImageId } from './EditableImage';
import { Header, HeaderProps } from './Header';

interface PageProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  header?: string;
  image?: ImageId;
  imageStyle?: React.CSSProperties;
  headerProps?: Partial<HeaderProps>;
  containerStyle?: React.CSSProperties;
  className?: string;
  id?: string;
}

export function Page(props: PageProps) {
  const height = headerHeight.useValue();

  const page = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    minHeight: [`calc(100vh - ${height || 0}px)`, `calc(100dvh - ${height || 0}px)`],
    boxSizing: 'border-box',
    scrollSnapAlign: 'start',
    position: 'relative',
    overflow: 'hidden',
    padding: '2rem 0',
  });

  return (
    <div id={props.id} className={classes(page, props.className)} style={props.style}>
      {props.image && (
        <EditableImage
          id={props.image}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          imageStyle={{ backgroundSize: 'cover', ...props.imageStyle }}
        />
      )}

      <div style={{ width: 'calc(100% - 4rem)', maxWidth: 'var(--max-width)', zIndex: 1, ...props.containerStyle }}>
        {props.header && <Header {...props.headerProps}>{props.header}</Header>}
        {props.children}
      </div>
    </div>
  );
}
