import React, { useRef, useState } from 'react';
import { getStorage, ref } from 'firebase/storage';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { FaFileUpload, FaHourglassHalf } from 'react-icons/fa';

import { IconButton } from '../IconButton';
import { app } from '../../util/firebase';
import { style } from 'typestyle';

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

  const [selectedFile, setSelectedFile] = useState<File>();
  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
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
              const file = e.target.files ? e.target.files[0] : undefined;
              setSelectedFile(file);
            }}
            className={fileInput}
          />
        </div>
        <IconButton
          icon={<FaFileUpload />}
          disabled={uploading || !selectedFile}
          onClick={async () => {
            if (selectedFile) {
              const storageRef = ref(storage, 'images/' + selectedFile.name);
              try {
                await uploadFile(storageRef, selectedFile, { contentType: selectedFile.type });
                if (inputRef.current) inputRef.current.value = '';
                setSelectedFile(undefined);
              } catch (err) {
                console.error(err);
              }

              props.reloadFiles();
            }
          }}
        >
          Upload Image
        </IconButton>

        {uploading && <FaHourglassHalf />}
      </div>
    </div>
  );
}
