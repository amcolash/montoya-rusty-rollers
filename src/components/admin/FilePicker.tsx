import React, { useState } from 'react';
import { FaFileImage } from 'react-icons/fa';

import { File } from '../../hooks/useFileList';
import { filePickerState } from '../../util/globalState';
import { Cropper } from './Cropper';
import { Dialog } from './Dialog';
import { FileUpload } from './FileUpload';
import { ImageGrid } from './ImageGrid';

export function FilePicker() {
  const [filePickerReference, setFilePickerReference] = filePickerState.use();
  const [reloadCounter, setReloadCounter] = useState(0);
  const [multiDirty, setMultiDirty] = useState(false);
  const [editing, setEditing] = useState<File | undefined>();

  if (!filePickerReference) return null;
  return (
    <Dialog
      title={
        <>
          {editing ? 'Editing Image' : filePickerReference.multi ? 'Choose Multiple Images' : 'Choose an Image'}{' '}
          <FaFileImage />
        </>
      }
      onClose={() => {
        if (multiDirty) {
          const ret = confirm('Changes you have made may not be saved. Are you sure you want to exit?');
          if (!ret) return;
        }

        setFilePickerReference(undefined);
      }}
    >
      {editing ? (
        <Cropper
          file={editing}
          setCrop={(crop) => {
            if (crop !== undefined) {
              console.log(crop);
            }

            setEditing(undefined);
          }}
        />
      ) : (
        <>
          <FileUpload reloadFiles={() => setReloadCounter(() => reloadCounter + 1)} />
          <ImageGrid
            reloadCounter={reloadCounter}
            multiDirty={multiDirty}
            setReloadCounter={setReloadCounter}
            setMultiDirty={setMultiDirty}
            setEditing={setEditing}
          />
        </>
      )}
    </Dialog>
  );
}
