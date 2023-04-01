import React, { useState } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../util/firebase';
import { Header } from './Header';
import { Login } from './Login';
import { Website } from '../website/Website';
import { DatabaseReference } from '@firebase/database';
import { FilePicker } from './FilePicker';

export function Admin() {
  const [user, loading, error] = useAuthState(auth);
  const [filePickerReference, setFilePickerReference] = useState<DatabaseReference | undefined>();

  if (!user || loading || error) return <Login />;

  return (
    <div>
      {filePickerReference && (
        <ReactFocusLock>
          <FilePicker filePickerReference={filePickerReference} setFilePickerReference={setFilePickerReference} />
        </ReactFocusLock>
      )}

      <Header />
      <Website />
    </div>
  );
}
