import React from 'react';

import { EditableText, TextId } from '../EditableText';
import { EditableImage, ImageId } from '../EditableImage';
import { Page } from '../Page';

export function Work() {
  return (
    <Page id="our-work" header="Our Work" containerStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <EditableText id={TextId.work} />
      <EditableImage id={ImageId.work} multi={true} style={{ marginTop: '3rem', width: 'unset', height: 'unset' }} />
    </Page>
  );
}
