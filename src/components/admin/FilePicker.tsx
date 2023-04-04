import { set } from 'firebase/database';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { FaFileImage, FaFileUpload, FaHourglassHalf, FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import { useFileList } from '../../hooks/useFileList';
import { app } from '../../util/firebase';

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
  const storage = getStorage(app);

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
      PICKER
      <div style={{ width: '85vw', background: 'var(--primary)', position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            background: 'var(--background)',
            color: 'var(--primary)',
            padding: '0.5rem',
          }}
        >
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Choose an Image <FaFileImage />
          </h3>
          <button onClick={() => setFilePickerReference(undefined)} style={{ position: 'absolute', right: '0.5rem' }}>
            <FaTimes />
          </button>
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
                style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
              >
                <span>Upload</span>
                <FaFileUpload />
              </button>

              {uploading && <FaHourglassHalf />}
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
                      if (confirm('Are you sure you want to delete this image?')) {
                        await deleteObject(i.ref);
                        setReloadCounter(() => reloadCounter + 1);
                      }
                    }}
                    style={{ padding: '0.15rem' }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
