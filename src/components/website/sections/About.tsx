import React from 'react';

import { cardStyle } from '../../../util/styles';
import { EditableImage, ImageId } from '../EditableImage';
import { EditableText, TextId } from '../EditableText';
import { Page } from '../Page';

export function About() {
  return (
    <Page id="about-us" header="About Us" image={ImageId.about} containerStyle={cardStyle}>
      <EditableImage
        id={ImageId.aboutTruck}
        style={{ marginTop: '2rem', textAlign: 'center' }}
        imageStyle={{ height: 200, width: undefined, marginBottom: '3rem' }}
        readOnly={true}
      />
      <EditableText id={TextId.about} />
      <EditableImage
        id={ImageId.aboutCert}
        style={{ marginTop: '2rem', textAlign: 'center' }}
        imageStyle={{ height: 200, width: undefined }}
        readOnly={true}
      />
    </Page>
  );
}
