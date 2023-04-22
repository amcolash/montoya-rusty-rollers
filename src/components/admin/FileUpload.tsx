import React, { useRef, useState } from 'react';
import { getStorage, ref } from 'firebase/storage';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { FaFileUpload, FaHourglassHalf } from 'react-icons/fa';

import { IconButton } from '../IconButton';
import { app } from '../../util/firebase';

interface FileUploadProps {
  reloadFiles: () => void;
}

export function FileUpload(props: FileUploadProps) {
  const storage = getStorage(app);

  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File>();
  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  return (
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
          style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          Upload Image
        </IconButton>

        {uploading && <FaHourglassHalf />}
      </div>
    </div>
  );
}
