import React from 'react';
import { EditableImage, ImageId } from './EditableImage';
import { EditableText, TextId } from './EditableText';
import { Nav } from './Nav';

export function Website() {
  return (
    <div>
      <Nav />

      <EditableText id={TextId.header} />
      <EditableText id={TextId.intro} />
      <EditableText id={TextId.main} />
      <EditableText id={TextId.footer} />

      <EditableImage id={ImageId.header} style={{ width: '50%', height: '20vh' }} />
    </div>
  );
}
