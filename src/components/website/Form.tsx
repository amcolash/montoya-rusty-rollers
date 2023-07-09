import React, { useState } from 'react';
import { cssRule } from 'typestyle';

interface Field {
  name: string;
  label?: string;
  type?: 'text' | 'textarea';
  required?: boolean;
  placeholder?: string;
}

interface FormProps {
  fields: Field[];
  onSubmit?: (values: FormData) => Promise<any>;
  style?: React.CSSProperties;
  formRef?: React.RefObject<HTMLFormElement>;
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
      fontFamily: 'var(--fonts)',
    },
    '& textarea': {
      resize: 'vertical',
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
              }, 3000)
            );
        }
      }}
      style={props.style}
      ref={props.formRef}
    >
      {props.fields.map((field) => {
        const id = field.name.toLowerCase().replace(/ /g, '-');
        const required = field.required === undefined || field.required;

        switch (field.type) {
          case 'textarea':
            return (
              <Field
                field={field}
                element={<textarea id={id} name={id} placeholder={field.placeholder} required={required} />}
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

      {props.onSubmit && <button type="submit">{formState}</button>}
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
        {required && <span style={{ color: 'var(--destructive-hover)' }}> *</span>}
      </label>
      {element}
    </div>
  );
}