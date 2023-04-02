import { ref, getDatabase } from 'firebase/database';
import React, { CSSProperties, useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, database } from '../../util/firebase';
import { useDb } from '../../hooks/useDb';
import useDebounce from '../../hooks/useDebounce';

export enum TextId {
  header = 'header',
  footer = 'footer',
  main = 'main',
  intro = 'intro',
}

interface EditableTextProps {
  id: TextId;
  style?: CSSProperties;
}

export function EditableText(props: EditableTextProps) {
  const [user] = useAuthState(auth);

  const [current, setCurrent] = useState('');
  const debouncedValue = useDebounce(current, 1000);

  const reference = ref(database, `text-${props.id}`);
  const [val, loading, error, setVal, saving] = useDb<string>(reference);

  useEffect(() => {
    setCurrent(val || '');
  }, [val]);

  useEffect(() => {
    if (debouncedValue && debouncedValue.length > 0) setVal(debouncedValue);
  }, [debouncedValue]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ display: 'flex', ...props.style }}>
      <ContentEditable disabled={!user} style={{ flex: 1 }} html={current} onChange={(e) => setCurrent(e.target.value)} />
      {user && <div>{saving ? '⏳' : '✅'}</div>}
    </div>
  );
}
