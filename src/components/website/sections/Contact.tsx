import React from 'react';
import { Page } from '../Page';
import { Form } from '../Form';
import { cardStyle } from '../../../util/styles';
import { EditableText, TextId } from '../EditableText';

export function Contact() {
  return (
    <Page id="contact" header="Contact us" style={{ background: 'hsl(320, 30%, 65%)' }} containerStyle={cardStyle}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ background: 'rgba(0,0,0,0.1)', padding: '3rem', flex: 1 }}>
          <h3>Our Info</h3>
          <EditableText id={TextId.contact} />
        </div>
        <Form
          style={{ minWidth: '15rem', flex: 3 }}
          fields={[{ name: 'Name' }, { name: 'Email' }, { name: 'Phone', label: 'Phone Number' }, { name: 'Message', type: 'textarea' }]}
          onSubmit={(data) => {
            console.log(Array.from(data.entries()));

            return new Promise((resolve, reject) => {
              setTimeout(reject, 1000);
            });
          }}
        />
      </div>
    </Page>
  );
}
