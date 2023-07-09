import React from 'react';

import { cardStyle } from '../../../util/styles';
import { EditableImage, ImageId } from '../EditableImage';
import { EditableText, TextId } from '../EditableText';
import { Page } from '../Page';

export function Work() {
  return (
    <Page
      id="our-work"
      header="Our Work"
      containerStyle={{ ...cardStyle, background: 'rgba(255, 255, 255, 0.65)' }}
      image={ImageId.work}
      imageStyle={{ backgroundRepeat: 'repeat', backgroundSize: 'unset' }}
    >
      <EditableText id={TextId.work} />
      <EditableImage id={ImageId.workGrid} multi={true} style={{ marginTop: '3rem' }} />
    </Page>
  );
}
