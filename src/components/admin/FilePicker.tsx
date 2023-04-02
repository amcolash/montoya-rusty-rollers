import { set } from 'firebase/database';
import { deleteObject, getDownloadURL, listAll, ref } from 'firebase/storage';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { useFileList } from '../../hooks/useFileList';

import { storage } from '../../util/firebase';
import { filePickerState } from '../../util/globalState';

interface FilePickerProps {
  style?: CSSProperties;
}

interface Image {
  name: string;
  path: string;
  url: string;
}

export function FilePicker(props: FilePickerProps) {
  const [filePickerReference, setFilePickerReference] = filePickerState.use();

  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  const [reloadCounter, setReloadCounter] = useState(0);
  const [images, loading] = useFileList('images/', reloadCounter);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFilePickerReference(undefined);
    };
    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  }, [setFilePickerReference]);

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
        zIndex: 1,
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
      <div style={{ width: '85vw', background: '#eee', position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            background: '#ccc',
            padding: '0.5rem',
          }}
        >
          <button onClick={() => setFilePickerReference(undefined)}>X</button>
        </div>

        <div
          style={{
            height: '85vh',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: '50%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '1rem',
                margin: '1rem',
                borderBottom: '1px solid #bbb',
                paddingBottom: '1.5rem',
              }}
            >
              <label htmlFor="file">Upload an Image</label>
              <input
                id="file"
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : undefined;
                  setSelectedFile(file);
                }}
              />
              <button
                disabled={uploading || !selectedFile}
                onClick={async () => {
                  if (selectedFile) {
                    const storageRef = ref(storage, 'images/' + selectedFile.name);
                    const result = await uploadFile(storageRef, selectedFile, { contentType: selectedFile.type });

                    if (inputRef.current) inputRef.current.value = '';
                    setSelectedFile(undefined);
                    setReloadCounter(() => reloadCounter + 1);
                  }
                }}
              >
                Upload
              </button>

              {uploading && '⏳'}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              padding: '0.75rem',
            }}
          >
            {loading && <div>Loading...</div>}
            {!loading && images.length === 0 && <div>No Images</div>}
            {!loading &&
              images.map((i) => (
                <div key={i.url} style={{ display: 'flex', flexDirection: 'column' }}>
                  <button
                    onClick={async () => {
                      await set(filePickerReference!, i.url);
                      setFilePickerReference(undefined);
                    }}
                    style={{ width: '10rem', height: '10rem', padding: '0.25rem', marginBottom: '0.5rem' }}
                  >
                    <img src={i.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                  <button
                    onClick={async () => {
                      await deleteObject(i.ref);
                      setReloadCounter(() => reloadCounter + 1);
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
