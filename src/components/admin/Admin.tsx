import React, { lazy, Suspense } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../util/firebase';
import { Login } from './Login';
import { Website } from '../website/Website';
import { filePickerState } from '../../util/globalState';

const FilePickerLazy = lazy(() => import('./FilePicker').then((module) => ({ default: module.FilePicker })));

export function Admin() {
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
