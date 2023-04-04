import { getAuth } from 'firebase/auth';
import React, { Suspense } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { useAuthState } from 'react-firebase-hooks/auth';

import { app } from '../../util/firebase';
import { Login } from './Login';
import { Website } from '../website/Website';
import { filePickerState } from '../../util/globalState';
import { FilePickerLazy } from '../LazyComponents';

export function Admin() {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [filePickerReference, setFilePickerReference] = filePickerState.use();

  if (!loading && (!user || error)) return <Login />;

  return (
    <div>
      {filePickerReference && (
        <ReactFocusLock>
          <Suspense>
            <FilePickerLazy />
          </Suspense>
        </ReactFocusLock>
      )}

      <Website />
    </div>
  );
}
