import React, { useState } from 'react';
import { FaFileImage } from 'react-icons/fa';

import { filePickerState } from '../../util/globalState';
import { Dialog } from './Dialog';
import { FileUpload } from './FileUpload';
import { ImageGrid } from './ImageGrid';

export function FilePicker() {
  const [filePickerReference, setFilePickerReference] = filePickerState.use();
  const [reloadCounter, setReloadCounter] = useState(0);
  const [multiDirty, setMultiDirty] = useState(false);

  if (!filePickerReference) return null;
  return (
    <Dialog
      title={
        <>
          Choose an Image <FaFileImage />
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
      <FileUpload reloadFiles={() => setReloadCounter(() => reloadCounter + 1)} />
      <ImageGrid
        reloadCounter={reloadCounter}
        setReloadCounter={setReloadCounter}
        multiDirty={multiDirty}
        setMultiDirty={setMultiDirty}
      />
    </Dialog>
  );
}
