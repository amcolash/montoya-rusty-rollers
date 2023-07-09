import { getAuth } from 'firebase/auth';
import React, { Suspense } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactFocusLock from 'react-focus-lock';

import { app } from '../../util/firebase';
import { filePickerState } from '../../util/globalState';
import { FilePickerLazy } from '../LazyComponents';
import { Website } from '../website/Website';
import { Login } from './Login';

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
