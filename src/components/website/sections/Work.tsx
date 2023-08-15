import React from 'react';
import { media, style } from 'typestyle';

import { cardStyle, mobileBreakpoint } from '../../../util/styles';
import { EditableImage, ImageId } from '../EditableImage';
import { EditableText, TextId } from '../EditableText';
import { Page } from '../Page';

const logoStyle = style(
  {
    height: '250px !important',
  },
  media(
    { maxWidth: mobileBreakpoint },
    {
      height: '200px !important',
    }
  )
);

export function Work() {
  return (
    <Page id="our-work" header="Our Work" containerStyle={cardStyle} image={ImageId.work}>
      <EditableImage
        id={ImageId.workLogo}
        style={{ margin: '2rem 0', textAlign: 'center' }}
        imageClassName={logoStyle}
        readOnly={true}
      />

      <EditableText id={TextId.work} />
      <EditableImage id={ImageId.workGrid} multi={true} style={{ marginTop: '3rem' }} />
    </Page>
  );
}
