import { DatabaseReference, set } from 'firebase/database';
import React, { CSSProperties, useEffect } from 'react';

interface FilePickerProps {
  filePickerReference?: DatabaseReference;
  setFilePickerReference: (reference: DatabaseReference | undefined) => void;
  style?: CSSProperties;
}

export const FilePicker = React.forwardRef(function FilePicker(props: FilePickerProps, ref) {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') props.setFilePickerReference(undefined);
    };
    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, [props.setFilePickerReference]);

  const images = [
    { name: 'Image 100', url: 'https://placehold.it/100' },
    { name: 'Image 150', url: 'https://placehold.it/150' },
    { name: 'Image 200', url: 'https://placehold.it/200' },
    { name: 'Image 250', url: 'https://placehold.it/250' },
    { name: 'Image 300', url: 'https://placehold.it/300' },
    { name: 'Image 350', url: 'https://placehold.it/350' },
    { name: 'Image 400', url: 'https://placehold.it/400' },
    { name: 'Image 450', url: 'https://placehold.it/450' },
    { name: 'Image 500', url: 'https://placehold.it/500' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1,
        ...props.style,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          props.setFilePickerReference(undefined);
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <div
        style={{
          width: '85%',
          height: '85%',
          background: '#eee',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', background: '#ccc', padding: '0.5rem', marginBottom: '1rem' }}>
          <button onClick={() => props.setFilePickerReference(undefined)}>X</button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: '0.75rem', padding: '0.75rem' }}>
          {images.map((i) => (
            <button
              key={i.url}
              onClick={async () => {
                await set(props.filePickerReference!, i.url);
                props.setFilePickerReference(undefined);
              }}
              style={{ width: '10rem', height: '10rem', padding: '0.25rem' }}
            >
              <img src={i.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
