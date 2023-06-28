import { ref } from 'firebase/database';
import React, { CSSProperties, useEffect, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { classes, style } from 'typestyle';

import { useDb } from '../../hooks/useDb';
import useDebounce from '../../hooks/useDebounce';
import { database } from '../../util/firebase';
import { useLocation } from '../../hooks/useLocation';

export enum TextId {
  banner = 'banner',
  services1 = 'services1',
  services2 = 'services2',
  services3 = 'services3',
  work = 'work',
  about = 'about',
}

const editable = style({
  color: 'inherit !important',
  backgroundColor: 'inherit !important',
  fontFamily: 'inherit !important',
  fontSize: 'inherit !important',
  lineHeight: 'inherit !important',
  whiteSpace: 'pre-line !important',
});

const adminStyles = style({ border: '3px solid orange', padding: '0.25rem', minWidth: '2rem' });

interface EditableTextProps {
  id: TextId;
  style?: CSSProperties;
  className?: string;
}

export function EditableText(props: EditableTextProps) {
  const { adminMode } = useLocation();

  const [current, setCurrent] = useState('');
  const contentRef = React.useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(current, 1000);

  const reference = ref(database, `content/text/${props.id}`);
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
    <div className={props.className} style={{ display: 'flex', position: 'relative', ...props.style }}>
      <ContentEditable
        disabled={!adminMode}
        style={{ flex: 1 }}
        html={current}
        onChange={(e) => setCurrent(contentRef.current?.innerText || '')}
        className={classes(editable, adminMode && adminStyles)}
        innerRef={contentRef}
      />
    </div>
  );
}
