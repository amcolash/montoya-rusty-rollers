import React, { CSSProperties, Suspense, useEffect, useState } from 'react';
import { classes, style } from 'typestyle';

import { useDb } from '../../hooks/useDb';
import useDebounce from '../../hooks/useDebounce';
import { useLocation } from '../../hooks/useLocation';
import { ContentEditableLazy } from '../LazyComponents';

export enum TextId {
  banner = 'banner',
  bannerSubtitle = 'bannerSubtitle',
  services1 = 'services1',
  services2 = 'services2',
  services3 = 'services3',
  work = 'work',
  about = 'about',
  contact = 'contact',
}

const editable = style({
  flex: 1,

  color: 'inherit !important',
  backgroundColor: 'inherit !important',
  fontFamily: 'inherit !important',
  fontSize: 'inherit !important',
  lineHeight: 'inherit !important',

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  whiteSpace: 'pre-line !important',
});

const adminStyles = style({ border: '3px solid orange', padding: '0.25rem', minWidth: '2rem' });

interface EditableTextProps {
  id: TextId;
  style?: CSSProperties;
  className?: string;
  readonly?: boolean;
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function EditableText(props: EditableTextProps) {
  const { adminMode } = useLocation();

  const [current, setCurrent] = useState('');
  const contentRef = React.useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(current, 1000);

  const reference = `content/text/${props.id}`;
  const [val, loading, error, setVal, saving] = useDb<string>(reference);

  useEffect(() => {
    setCurrent(val || '');
  }, [val]);

  useEffect(() => {
    if (debouncedValue && debouncedValue.length > 0) setVal(debouncedValue);
  }, [debouncedValue]);

  if (loading) return null;
  if (error) return <div>Error: {error.message}</div>;

  const properties = {
    className: props.className,
    style: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      ...props.style,
    },
  };

  const headingElement = props.heading || 'div';

  if (adminMode && !props.readonly) {
    return React.createElement(
      headingElement,
      { ...properties },
      <Suspense>
        <ContentEditableLazy
          html={current}
          onChange={(e) => setCurrent(contentRef.current?.innerHTML || '')}
          className={classes(editable, adminStyles)}
          innerRef={contentRef}
        />
      </Suspense>
    );
  }

  return React.createElement(headingElement, { ...properties, dangerouslySetInnerHTML: { __html: val || '' } });
}
