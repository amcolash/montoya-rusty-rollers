import { ref } from 'firebase/database';
import React, { CSSProperties } from 'react';
import { database } from '../../util/firebase';
import { useDb } from '../../hooks/useDb';
import { filePickerState } from '../../util/globalState';
import { useLocation } from 'react-router-dom';
import { FaFileImage } from 'react-icons/fa';
import { IconButton } from '../IconButton';

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
            {props.multi ? 'Choose Photos' : 'Choose Photo'}
          </IconButton>
        </div>
      )}
      {val && <img src={val} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
    </div>
  );
}
