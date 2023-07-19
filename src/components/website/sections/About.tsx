import React from 'react';

import { cardStyle } from '../../../util/styles';
import { EditableImage, ImageId } from '../EditableImage';
import { EditableText, TextId } from '../EditableText';
import { Page } from '../Page';

export function About() {
  return (
    <Page
      id="about-us"
      header="About Us"
      image={ImageId.about}
      containerStyle={{ ...cardStyle, background: 'rgba(255, 255, 255, 0.65)' }}
      imageStyle={{ backgroundRepeat: 'repeat', backgroundSize: 'unset' }}
    >
      <EditableImage
        id={ImageId.aboutTruck}
        style={{ margin: '2rem 0', textAlign: 'center' }}
        imageStyle={{ height: 200, width: undefined }}
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
