import React from 'react';
import { FaCarCrash, FaOilCan, FaTools } from 'react-icons/fa';
import { style } from 'typestyle';

import { ImageId } from '../EditableImage';
import { EditableText, TextId } from '../EditableText';
import { Page } from '../Page';

const section = style({
  flex: '1 1 0',

  $nest: {
    '& .icon': {
      width: 'min(10vw, 4rem)',
      height: 'min(10vw, 4rem)',

      padding: 'min(3vw, 1.5rem)',
      border: '3px solid var(--light)',
      borderRadius: '100%',
    },
  },
});

function Section(props: { icon: React.ReactNode; title: string; textId: TextId }) {
  return (
    <div className={section}>
      {props.icon}
      <h3>{props.title}</h3>
      <EditableText id={props.textId} />
    </div>
  );
}

export function Services() {
  return (
    <Page
      id="services"
      header="Services"
      image={ImageId.services}
      style={{ color: 'var(--light)' }}
      headerProps={{ color: 'var(--light)', style: { marginBottom: '5rem' } }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.8)',
          zIndex: -1,
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 'min(2vw, 2rem)',
        }}
      >
        <Section icon={<FaCarCrash className="icon" />} title="Repairs" textId={TextId.services1} />
        <Section icon={<FaOilCan className="icon" />} title="Maintenance" textId={TextId.services2} />
        <Section icon={<FaTools className="icon" />} title="Mechanical" textId={TextId.services3} />
      </div>
    </Page>
  );
}
