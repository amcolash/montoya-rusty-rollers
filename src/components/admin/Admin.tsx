import React from 'react';
import ReactFocusLock from 'react-focus-lock';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../util/firebase';
import { Login } from './Login';
import { Website } from '../website/Website';
import { FilePicker } from './FilePicker';
import { filePickerState } from '../../util/globalState';

export function Admin() {
  const [user, loading, error] = useAuthState(auth);
  const [filePickerReference, setFilePickerReference] = filePickerState.use();

  if (loading) return <div>Loading...</div>;

  if (!user || error) return <Login />;

  return (
    <div>
      {filePickerReference && (
        <ReactFocusLock>
          <FilePicker />
        </ReactFocusLock>
      )}

      <Website />
    </div>
  );
}
