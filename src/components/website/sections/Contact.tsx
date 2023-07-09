import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';

import { cardStyle } from '../../../util/styles';
import { EditableText, TextId } from '../EditableText';
import { Form } from '../Form';
import { Page } from '../Page';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Page id="contact" header="Contact Us" containerStyle={cardStyle}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div
          style={{
            border: '1px solid #ddd',
            background: '#fafafa',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            flex: 1,
            minWidth: '15rem',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Our Info</h3>
          <EditableText id={TextId.contact} />
        </div>
        <Form
          style={{ minWidth: '15rem', flex: 4 }}
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
          ariaLabel="Contact Form"
        />
      </div>
    </Page>
  );
}
