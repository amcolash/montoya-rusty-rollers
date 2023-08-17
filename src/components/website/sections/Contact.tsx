import emailjs from '@emailjs/browser';
import React, { useEffect, useRef } from 'react';
import { FaFacebook, FaMap, FaPhone } from 'react-icons/fa';

import { cardStyle } from '../../../util/styles';
import { ImageId } from '../EditableImage';
import { Form } from '../Form';
import { Page } from '../Page';

export function Contact() {
  useEffect(() => {
    // Init emailjs
    const publicKey = 'Ht6JdHW9yl4CS63qN';
    emailjs.init(publicKey);
  }, []);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Page id="contact" header="Contact Us" containerStyle={cardStyle} image={ImageId.contact}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <SocialLink
          label="Call Us: "
          href={{ link: 'tel:505-710-1342', label: '505-710-1342' }}
          icon={<FaPhone style={{ marginTop: '-4px' }} />}
        />
        <SocialLink
          href={{ link: '#home', label: 'Visit our Facebook' }}
          icon={<FaFacebook style={{ marginTop: '-2px' }} />}
        />
        <SocialLink href={{ label: 'Belen, NM' }} icon={<FaMap style={{ marginTop: '-2px' }} />} />
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

function SocialLink(props: { href: { link?: string; label: string }; icon: React.ReactElement; label?: string }) {
  const { label, href, icon } = props;

  return (
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
      <span style={{ display: 'flex', marginRight: '0.75rem' }}>{icon}</span>
      {label && <span>{label}</span>}
      {href.link ? <a href={href.link}>{href.label}</a> : href.label}
    </div>
  );
}
