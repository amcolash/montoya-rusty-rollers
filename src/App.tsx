import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import * as React from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { EditableText, TextId } from './EditableText';
import { auth } from './firebase';

const provider = new GoogleAuthProvider();

export default () => {
  const [user, loading, error] = useAuthState(auth);

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

      <EditableText id={TextId.header} readonly={user === undefined} />
      <EditableText id={TextId.intro} readonly={user === undefined} />
      <EditableText id={TextId.main} readonly={user === undefined} />
      <EditableText id={TextId.footer} readonly={user === undefined} />
    </>
  );
};
