import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { DatabaseReference } from 'firebase/database';
import React, { useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import ReactFocusLock from 'react-focus-lock';
import { EditableImage, ImageId } from './EditableImage';
import { EditableText, TextId } from './EditableText';
import { FilePicker } from './FilePicker';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

export default () => {
  const [user, loading, error] = useAuthState(auth);
  const [filePickerReference, setFilePickerReference] = useState<DatabaseReference | undefined>();

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFilePickerReference(undefined);
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [setFilePickerReference]);

  return (
    <>
      {loading && 'Loading...'}
      {error && 'Error: ' + error.message}
      {!user && <button onClick={() => signInWithPopup(auth, provider)}>Login</button>}
      {user && (
        <div>
          {user.displayName}
          <button onClick={() => signOut(auth)}>Log Out</button>
        </div>
      )}

      {filePickerReference && (
        <ReactFocusLock>
          <FilePicker filePickerReference={filePickerReference} setFilePickerReference={setFilePickerReference} />
        </ReactFocusLock>
      )}

      <EditableText id={TextId.header} />
      <EditableText id={TextId.intro} />
      <EditableText id={TextId.main} />
      <EditableText id={TextId.footer} />

      <EditableImage id={ImageId.header} setFilePickerReference={setFilePickerReference} style={{ width: '50%', height: '20vh' }} />
    </>
  );
};
