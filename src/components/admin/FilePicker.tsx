import React, { useState } from 'react';
import { FaFileImage } from 'react-icons/fa';
import { filePickerState } from '../../util/globalState';
import { FileUpload } from './FileUpload';
import { ImageGrid } from './FileGrid';
import { Dialog } from './Dialog';

export function FilePicker() {
  const [filePickerReference, setFilePickerReference] = filePickerState.use();
  const [reloadCounter, setReloadCounter] = useState(0);

  if (!filePickerReference) return null;
  return (
    <Dialog
      title={
        <span>
          Choose an Image <FaFileImage />
        </span>
      }
      onClose={() => setFilePickerReference(undefined)}
    >
      <FileUpload reloadFiles={() => setReloadCounter(() => reloadCounter + 1)} />
      <ImageGrid reloadCounter={reloadCounter} setReloadCounter={setReloadCounter} />
    </Dialog>
  );
}
