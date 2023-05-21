import { ref } from 'firebase/database';
import React, { CSSProperties, useState } from 'react';
import { FaFileImage } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

import { IconButton } from '../IconButton';
import { useDb } from '../../hooks/useDb';
import { database } from '../../util/firebase';
import { filePickerState } from '../../util/globalState';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export enum ImageId {
  header = 'header',
  services = 'services',
  work = 'work',
  about = 'about',
  aboutCert = 'aboutCert',
}

interface EditableImageProps {
  id: ImageId;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  multi?: boolean;
  readOnly?: boolean;
}

export function EditableImage(props: EditableImageProps) {
  const location = useLocation();
  const admin = location.pathname.includes('/admin');

  const [filePickerReference, setFilePickerReference] = filePickerState.use();

  const reference = ref(database, `content/images/${props.id}`);
  const [val, loading, error, setVal, saving] = useDb<string>(reference);

  const [index, setIndex] = useState(-1);

  return (
    <div style={{ position: 'relative', ...props.style }}>
      {admin && !props.readOnly && (
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <IconButton icon={<FaFileImage />} onClick={() => setFilePickerReference({ ref: reference, multi: props.multi === true })}>
            {props.multi ? 'Choose Multiple Photos' : 'Choose Photo'}
          </IconButton>
        </div>
      )}
      {val && !props.multi && <img src={val} style={{ width: '100%', height: '100%', objectFit: 'cover', ...props.imageStyle }} />}
      {val && props.multi && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            border: admin ? '3px solid orange' : undefined,
          }}
        >
          {JSON.parse(val).map((url: string, i: number) => (
            <button
              onClick={() => setIndex(i)}
              key={url}
              style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer' }}
            >
              <img src={url} style={{ height: '14rem', objectFit: 'cover', ...props.imageStyle }} />
            </button>
          ))}

          <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={JSON.parse(val).map((url: string) => {
              return { src: url };
            })}
            controller={{ closeOnBackdropClick: true }}
          />
        </div>
      )}
    </div>
  );
}
