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
      containerStyle={{ ...cardStyle, background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(0.25rem)' }}
      image={ImageId.work}
    >
      <EditableImage
        id={ImageId.workLogo}
        style={{ margin: '2rem 0', textAlign: 'center' }}
        imageStyle={{ height: 250 }}
        readOnly={true}
      />

      <EditableText id={TextId.work} />
      <EditableImage id={ImageId.workGrid} multi={true} style={{ marginTop: '3rem' }} />
    </Page>
  );
}
