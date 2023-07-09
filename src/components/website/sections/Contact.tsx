import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import { FaPhone } from 'react-icons/fa';

import { cardStyle } from '../../../util/styles';
import { ImageId } from '../EditableImage';
import { Form } from '../Form';
import { Page } from '../Page';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Page
      id="contact"
      header="Contact Us"
      containerStyle={{ ...cardStyle, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(0.25rem)' }}
      image={ImageId.contact}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            fontSize: '1.2rem',
            gap: '0.5rem',
          }}
        >
          Call Us:
          <a href="tel:505-710-1342">505-710-1342</a>
          <FaPhone />
        </div>

        <Form
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
