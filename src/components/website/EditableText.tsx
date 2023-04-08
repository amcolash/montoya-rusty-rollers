import { ref } from 'firebase/database';
import React, { CSSProperties, useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';

import { database } from '../../util/firebase';
import { useDb } from '../../hooks/useDb';
import useDebounce from '../../hooks/useDebounce';
import { useLocation } from 'react-router-dom';
import { FaHourglassHalf, FaSave } from 'react-icons/fa';
import { style } from 'typestyle';

export enum TextId {
  services1 = 'services1',
  services2 = 'services2',
  services3 = 'services3',
}

const editable = style({
  $nest: {
    '& > div': {
      color: 'inherit !important',
      backgroundColor: 'inherit !important',
      fontFamily: 'inherit !important',
      fontSize: 'inherit !important',
      lineHeight: 'inherit !important',
      whiteSpace: 'inherit !important',
    },
  },
});

interface EditableTextProps {
  id: TextId;
  style?: CSSProperties;
}

export function EditableText(props: EditableTextProps) {
  const location = useLocation();

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
      <ContentEditable
        disabled={location.pathname === '/'}
        style={{ flex: 1 }}
        html={current}
        onChange={(e) => setCurrent(e.target.value)}
        className={editable}
      />
      {location.pathname.includes('/admin') && <div>{saving ? <FaHourglassHalf /> : <FaSave />}</div>}
    </div>
  );
}
