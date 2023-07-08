import React from 'react';
import { Page } from '../Page';
import { EditableText, TextId } from '../EditableText';
import { EditableImage, ImageId } from '../EditableImage';
import { cardStyle } from '../../../util/styles';

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
