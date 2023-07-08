import React, { useRef, useState } from 'react';
import { cssRule } from 'typestyle';

interface Field {
  name: string;
  label?: string;
  type?: 'text' | 'textarea';
  required?: boolean;
}

interface FormProps {
  fields: Field[];
  onSubmit?: (values: FormData) => Promise<void>;
  style?: React.CSSProperties;
}

enum FormState {
  Default = 'Send',
  Sending = 'Sending...',
  Sent = 'Message Sent!',
  Error = 'Something went wrong...',
}

cssRule('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',

  margin: '0 auto',
  gap: '1rem',

  $nest: {
    '& .field': {
      width: '100%',
    },
    '& input, & textarea': {
      width: '100%',
      padding: '0.5rem',
      boxSizing: 'border-box',
      borderRadius: '0.25rem',
      border: 'none',
    },
  },
});

export function Form(props: FormProps) {
  const [formState, setFormState] = useState(FormState.Default);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if (props.onSubmit) {
          const data = new FormData(e.target as HTMLFormElement);

          setFormState(FormState.Sending);
          props
            .onSubmit(data)
            .then(() => setFormState(FormState.Sent))
            .catch((err) => setFormState(FormState.Error))
            .finally(() =>
              setTimeout(() => {
                setFormState(FormState.Default);
              }, 3000)
            );
        }
      }}
      style={props.style}
    >
      {props.fields.map((field) => {
        const id = field.name.toLowerCase().replace(/ /g, '-');
        const label = field.label || field.name;
        const required = field.required === undefined || field.required;

        switch (field.type) {
          case 'textarea':
            return (
              <div key={id} className="field">
                <label htmlFor={id}>
                  {label}
                  {required && <span style={{ color: 'var(--destructive)' }}> *</span>}
                </label>
                <textarea id={id} name={id} value="test value" required={required} />
              </div>
            );
          default:
            return (
              <div key={id} className="field">
                <label htmlFor={id}>
                  {label}
                  {required && <span style={{ color: 'var(--destructive)' }}> *</span>}
                </label>
                <input type="text" id={id} name={id} value="test value" required={required} />
              </div>
            );
        }
      })}

      {props.onSubmit && <button type="submit">{formState}</button>}
    </form>
  );
}
