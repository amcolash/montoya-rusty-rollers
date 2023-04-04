import { DatabaseReference, ref } from 'firebase/database';
import React, { CSSProperties } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from '../../util/firebase';
import { useDb } from '../../hooks/useDb';
import { filePickerState } from '../../util/globalState';
import { useLocation } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';

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
      {location.pathname.includes('/admin') && (
        <div style={{ position: 'absolute', top: '0.25rem', right: '0.25rem' }}>
          <button onClick={() => setFilePickerReference(reference)} style={{ marginLeft: '0.5rem', display: 'flex', gap: '0.25rem' }}>
            <span>Edit</span>
            <FaRegEdit />
          </button>
        </div>
      )}
      {val && <img src={val} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
    </div>
  );
}
