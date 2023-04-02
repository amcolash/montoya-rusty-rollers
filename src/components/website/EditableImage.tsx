import { DatabaseReference, ref } from 'firebase/database';
import React, { CSSProperties } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../../util/firebase';
import { useDb } from '../../hooks/useDb';
import { filePickerState } from '../../util/globalState';
import { useLocation } from 'react-router-dom';

export enum ImageId {
  header = 'header',
  footer = 'footer',
  main = 'main',
  intro = 'intro',
}

interface EditableImageProps {
  id: ImageId;
  style?: CSSProperties;
}

export function EditableImage(props: EditableImageProps) {
  const location = useLocation();

  const [filePickerReference, setFilePickerReference] = filePickerState.use();

  const reference = ref(database, `image-${props.id}`);
  const [val, loading, error, setVal, saving] = useDb<string>(reference);

  return (
    <div style={{ position: 'relative', ...props.style }}>
      {location.pathname === '/admin' && (
        <div style={{ position: 'absolute', top: '0.25rem', right: '0.25rem' }}>
          <button onClick={() => setFilePickerReference(reference)} style={{ marginLeft: '0.5rem' }}>
            Edit
          </button>
        </div>
      )}
      {val && <img src={val} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
    </div>
  );
}
