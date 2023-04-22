import { ref } from 'firebase/database';
import React, { CSSProperties } from 'react';
import { FaFileImage } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

import { IconButton } from '../IconButton';
import { useDb } from '../../hooks/useDb';
import { database } from '../../util/firebase';
import { filePickerState } from '../../util/globalState';

export enum ImageId {
  header = 'header',
  services = 'services',
  work = 'work',
}

interface EditableImageProps {
  id: ImageId;
  style?: CSSProperties;
  multi?: boolean;
}

export function EditableImage(props: EditableImageProps) {
  const location = useLocation();

  const [filePickerReference, setFilePickerReference] = filePickerState.use();

  const reference = ref(database, `image-${props.id}`);
  const [val, loading, error, setVal, saving] = useDb<string>(reference);

  return (
    <div style={{ position: 'relative', ...props.style }}>
      {location.pathname.includes('/admin') && (
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <IconButton icon={<FaFileImage />} onClick={() => setFilePickerReference({ ref: reference, multi: props.multi === true })}>
            {props.multi ? 'Choose Multiple Photos' : 'Choose Photo'}
          </IconButton>
        </div>
      )}
      {val && !props.multi && <img src={val} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      {val && props.multi && (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {JSON.parse(val).map((url: string) => (
            <img src={url} key={url} style={{ width: '14rem', height: '14rem', objectFit: 'cover' }} />
          ))}
        </div>
      )}
    </div>
  );
}
