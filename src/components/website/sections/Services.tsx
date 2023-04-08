import React from 'react';
import { FaCarCrash, FaOilCan, FaTools } from 'react-icons/fa';
import { style } from 'typestyle';
import { EditableImage, ImageId } from '../EditableImage';
import { EditableText, TextId } from '../EditableText';
import { Header } from '../Header';
import { Page } from '../Page';

const section = style({
  flex: '1 1 0',

  $nest: {
    '& .icon': {
      width: 'min(10vw, 4rem)',
      height: 'min(10vw, 4rem)',

      padding: 'min(3vw, 1.5rem)',
      border: '3px solid var(--primary)',
      borderRadius: '100%',
    },
  },
});

export function Services() {
  return (
    <Page id="services" style={{ position: 'relative', color: 'var(--primary)', maxHeight: '50vh' }}>
      <EditableImage id={ImageId.services} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }} />
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Header color="var(--primary)" style={{ width: '100%' }}>
          Services
        </Header>
        <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', gap: '2rem', width: 'calc(100% - 4rem)' }}>
          <div className={section}>
            <FaCarCrash className="icon" />
            <h3>Repairs</h3>
            <EditableText id={TextId.services1} />
          </div>
          <div className={section}>
            <FaOilCan className="icon" />
            <h3>Maintenance</h3>
            <EditableText id={TextId.services2} />
          </div>
          <div className={section}>
            <FaTools className="icon" />
            <h3>Mechanical</h3>
            <EditableText id={TextId.services3} />
          </div>
        </div>
      </div>
    </Page>
  );
}
