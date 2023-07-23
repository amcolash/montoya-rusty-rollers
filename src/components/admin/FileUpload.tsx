import { getStorage, ref } from 'firebase/storage';
import React, { useRef, useState } from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { FaFileUpload, FaHourglassHalf } from 'react-icons/fa';
import { style } from 'typestyle';

import { app } from '../../util/firebase';
import { IconButton } from '../IconButton';

interface FileUploadProps {
  reloadFiles: () => void;
}

const fileInput = style({
  $nest: {
    '&::file-selector-button': {
      marginRight: '20px',
      padding: '0.5rem 1rem',
      background: `var(--cta)`,
      border: `1px solid var(--cta-border)`,
      borderRadius: '0.25rem',
      color: 'white',
      cursor: 'pointer',
      transition: 'background .2s ease-in-out',
    },

    '&::file-selector-button:hover': {
      background: 'var(--cta-hover)',
    },
  },
});

export function FileUpload(props: FileUploadProps) {
  const storage = getStorage(app);

  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          margin: '1rem',
        }}
      >
        <div>
          <input
            id="file"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={(e) => {
              setSelectedFiles(Array.from(e.target.files || []));
            }}
            className={fileInput}
            disabled={uploading}
            multiple
          />
        </div>
        <IconButton
          icon={<FaFileUpload />}
          disabled={uploading || selectedFiles.length === 0}
          onClick={async () => {
            for (const f of selectedFiles) {
              const storageRef = ref(storage, 'images/' + f.name);
              try {
                await uploadFile(storageRef, f, { contentType: f.type });
              } catch (err) {
                console.error(err);
              }
            }

            setTimeout(() => {
              if (inputRef.current) inputRef.current.value = '';
              setSelectedFiles([]);
              props.reloadFiles();
            }, 3000);
          }}
        >
          Upload Image{selectedFiles.length > 1 && 's'}
        </IconButton>

        {uploading && <FaHourglassHalf />}
      </div>
    </div>
  );
}
