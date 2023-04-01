import { DatabaseReference, ref } from 'firebase/database';
import React, { CSSProperties } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, database } from './firebase';
import { useDb } from './useDb';

export enum ImageId {
  header = 'header',
  footer = 'footer',
  main = 'main',
  intro = 'intro',
}

interface EditableImageProps {
  id: ImageId;
  style?: CSSProperties;
  setFilePickerReference: (reference: DatabaseReference | undefined) => void;
}

export function EditableImage(props: EditableImageProps) {
  const [user] = useAuthState(auth);

  const reference = ref(database, `image-${props.id}`);
  const [val, loading, error, setVal, saving] = useDb<string>(reference);

  return (
    <div style={{ position: 'relative', ...props.style }}>
      {user && (
        <div style={{ position: 'absolute', top: '0.25rem', right: '0.25rem' }}>
          <button onClick={() => props.setFilePickerReference(reference)} style={{ marginLeft: '0.5rem' }}>
            Edit
          </button>
        </div>
      )}
      {val && <img src={val} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
    </div>
  );
}
