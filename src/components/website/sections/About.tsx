import React from 'react';
import { Page } from '../Page';
import { EditableText, TextId } from '../EditableText';
import { EditableImage, ImageId } from '../EditableImage';

export function About() {
  return (
    <Page
      id="about-us"
      header="About Us"
      image={ImageId.about}
      containerStyle={{
        background: 'var(--light)',
        borderRadius: '1rem',
        padding: '1rem min(3vw, 3rem)',
        width: 'calc(100% - 2rem - 8vw)',
      }}
    >
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
