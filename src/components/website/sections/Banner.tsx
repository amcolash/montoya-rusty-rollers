import React from 'react';

import { EditableImage, ImageId } from '../EditableImage';
import { Page } from '../Page';

export function Banner() {
  return (
    <Page id="banner" style={{ padding: 0 }}>
      <EditableImage id={ImageId.header} style={{ width: '100%', height: '100%' }} />
    </Page>
  );
}
