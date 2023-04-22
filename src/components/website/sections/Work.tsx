import React from 'react';
import { Header } from '../Header';
import { Page } from '../Page';
import { EditableText, TextId } from '../EditableText';
import { EditableImage, ImageId } from '../EditableImage';

export function Work() {
  return (
    <Page id="our-work">
      <Header>Our Work</Header>
      <div style={{ width: 'calc(100% - 4rem)' }}>
        <EditableText id={TextId.ourWork} />
        <EditableImage id={ImageId.work} multi={true} />
      </div>
    </Page>
  );
}
