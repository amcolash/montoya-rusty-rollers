import { ref, getDatabase } from 'firebase/database';
import React, { CSSProperties, useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, database } from './firebase';
import { useDb } from './useDb';
import useDebounce from './useDebounce';

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
    if (debouncedValue && debouncedValue !== val) setVal(debouncedValue);
  }, [debouncedValue, val]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ display: 'flex', ...props.style }}>
      <ContentEditable disabled={!user} style={{ flex: 1 }} html={current} onChange={(e) => setCurrent(e.target.value)} />
      <div>{saving ? '⏳' : '✅'}</div>
    </div>
  );
}
