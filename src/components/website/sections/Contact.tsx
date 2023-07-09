import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';

import { cardStyle } from '../../../util/styles';
import { EditableText, TextId } from '../EditableText';
import { Form } from '../Form';
import { Page } from '../Page';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Page id="contact" header="Contact us" style={{ background: 'hsl(320, 30%, 65%)' }} containerStyle={cardStyle}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div style={{ background: 'rgba(0,0,0,0.1)', padding: '3rem', flex: 1 }}>
          <h3>Our Info</h3>
          <EditableText id={TextId.contact} />
        </div>
        <Form
          style={{ minWidth: '15rem', flex: 3 }}
          fields={[
            { name: 'Name' },
            { name: 'Email' },
            { name: 'Phone', label: 'Phone Number' },
            { name: 'Message', type: 'textarea' },
          ]}
          formRef={formRef}
          onSubmit={() => {
            const serviceID = 'default_service';
            const templateID = 'template_zhcnuwt';

            return new Promise((resolve, reject) => {
              emailjs.sendForm(serviceID, templateID, formRef.current!).then(resolve, (err) => reject(err));
            });
          }}
        />
      </div>
    </Page>
  );
}
