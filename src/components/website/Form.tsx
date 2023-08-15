import React, { useState } from 'react';
import { cssRule } from 'typestyle';

interface FormProps {
  fields: Field[];
  onSubmit?: (values: FormData) => Promise<unknown>;
  style?: React.CSSProperties;
  formRef?: React.RefObject<HTMLFormElement>;
  ariaLabel?: string;
}

interface Field {
  name: string;
  label?: string;
  type?: 'text' | 'textarea';
  required?: boolean;
  placeholder?: string;
}

enum FormState {
  Default = 'Send Message',
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
            .catch((err) => {
              setFormState(FormState.Error);
              console.error(err);
            })
            .finally(() =>
              setTimeout(() => {
                setFormState(FormState.Default);
              }, 3000),
            );
        }
      }}
      style={props.style}
      ref={props.formRef}
      aria-label={props.ariaLabel || 'form'}
    >
      {props.fields.map((field) => {
        const id = field.name.toLowerCase().replace(/ /g, '-');
        const required = field.required === undefined || field.required;

        switch (field.type) {
          case 'textarea':
            return (
              <Field
                field={field}
                element={<textarea id={id} name={id} placeholder={field.placeholder} required={required} rows={4} />}
              />
            );
          default:
            return (
              <Field
                field={field}
                element={<input type="text" id={id} name={id} placeholder={field.placeholder} required={required} />}
              />
            );
        }
      })}

      {props.onSubmit && (
        <button type="submit" style={{ width: '100%', fontSize: '1.1rem' }} aria-description="Submit Form">
          {formState}
        </button>
      )}
    </form>
  );
}

function Field(props: { field: Field; element: React.ReactElement }) {
  const { field, element } = props;

  const id = field.name.toLowerCase().replace(/ /g, '-');
  const label = field.label || field.name;
  const required = field.required === undefined || field.required;

  return (
    <div key={id} className="field">
      <label htmlFor={id}>
        {label}
        {required && (
          <span style={{ color: 'var(--destructive-hover)' }} aria-hidden={true}>
            {' '}
            *
          </span>
        )}
      </label>
      {element}
    </div>
  );
}
