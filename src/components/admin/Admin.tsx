import { getAuth } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import React, { Suspense, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactFocusLock from 'react-focus-lock';

import { app, database } from '../../util/firebase';
import { filePickerState } from '../../util/globalState';
import { FilePickerLazy } from '../LazyComponents';
import { Website } from '../website/Website';
import { Login } from './Login';

export const adminStorageKey = 'rusty-rollers-admin';

export function Admin() {
  const auth = getAuth(app);
  const [invalidUser, setInvalidUser] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [filePickerReference, setFilePickerReference] = filePickerState.use();

  useEffect(() => {
    if (user) {
      // Attempt to write to the database to test if the user is an admin. If not, sign out
      const reference = ref(database, `content/admin-test`);
      set(reference, 'test')
        .then(() => {
          localStorage.setItem(adminStorageKey, 'true');
        })
        .catch((e) => {
          console.error('invalid user', e);
          localStorage.removeItem(adminStorageKey);
          auth.signOut();
          setInvalidUser(true);
        });
    }
  }, [user]);

  if (!loading && (!user || error)) return <Login invalidUser={invalidUser} />;

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
