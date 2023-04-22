import { ref } from 'firebase/database';
import React, { CSSProperties, useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { FaCheck, FaHourglassHalf } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { classes, style } from 'typestyle';

import { useDb } from '../../hooks/useDb';
import useDebounce from '../../hooks/useDebounce';
import { database } from '../../util/firebase';

export enum TextId {
  banner = 'banner',
  services1 = 'services1',
  services2 = 'services2',
  services3 = 'services3',
  ourWork = 'ourWork',
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

const adminStyles = style({ border: '3px solid orange', padding: '0.25rem', minWidth: '2rem' });

interface EditableTextProps {
  id: TextId;
  style?: CSSProperties;
  className?: string;
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

  const admin = location.pathname.includes('/admin');

  return (
    <div className={props.className} style={{ display: 'flex', position: 'relative', ...props.style }}>
      <ContentEditable
        disabled={location.pathname === '/'}
        style={{ flex: 1 }}
        html={current}
        onChange={(e) => setCurrent(e.target.value)}
        className={classes(editable, admin && adminStyles)}
      />
      {admin && (
        <div style={{ position: 'absolute', bottom: '0.25rem', right: '0.25rem', fontSize: 16, lineHeight: 0, color: 'orange' }}>
          {saving ? <FaHourglassHalf /> : <FaCheck />}
        </div>
      )}
    </div>
  );
}
