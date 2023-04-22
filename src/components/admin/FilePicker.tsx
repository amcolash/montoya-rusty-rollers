import React, { CSSProperties, useEffect, useState } from 'react';
import { FaFileImage, FaTimes } from 'react-icons/fa';
import { filePickerState } from '../../util/globalState';
import { FileUpload } from './FileUpload';
import { ImageGrid } from './FileGrid';

interface FilePickerProps {
  style?: CSSProperties;
}

export function FilePicker(props: FilePickerProps) {
  const [filePickerReference, setFilePickerReference] = filePickerState.use();
  const [reloadCounter, setReloadCounter] = useState(0);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFilePickerReference(undefined);
    };
    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, [setFilePickerReference]);

  if (!filePickerReference) return null;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 2,
        ...props.style,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          setFilePickerReference(undefined);
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <div style={{ width: '85vw', background: 'var(--light)', position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            background: 'var(--dark)',
            color: 'var(--light)',
            padding: '0.5rem',
          }}
        >
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Choose an Image <FaFileImage />
          </h3>
          <button onClick={() => setFilePickerReference(undefined)} style={{ position: 'absolute', right: '0.5rem', paddingTop: '0.2rem' }}>
            <FaTimes />
          </button>
        </div>

        <div
          style={{
            height: '85vh',
            overflowY: 'auto',
          }}
        >
          <FileUpload reloadFiles={() => setReloadCounter(() => reloadCounter + 1)} />
          <ImageGrid reloadCounter={reloadCounter} setReloadCounter={setReloadCounter} />
        </div>
      </div>
    </div>
  );
}
