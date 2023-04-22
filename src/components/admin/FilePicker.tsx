import React, { useState } from 'react';
import { FaFileImage } from 'react-icons/fa';

import { Dialog } from './Dialog';
import { FileUpload } from './FileUpload';
import { ImageGrid } from './ImageGrid';
import { filePickerState } from '../../util/globalState';

export function FilePicker() {
  const [filePickerReference, setFilePickerReference] = filePickerState.use();
  const [reloadCounter, setReloadCounter] = useState(0);

  if (!filePickerReference) return null;
  return (
    <Dialog
      title={
        <>
          Choose an Image <FaFileImage />
        </>
      }
      onClose={() => setFilePickerReference(undefined)}
    >
      <FileUpload reloadFiles={() => setReloadCounter(() => reloadCounter + 1)} />
      <ImageGrid reloadCounter={reloadCounter} setReloadCounter={setReloadCounter} />
    </Dialog>
  );
}
