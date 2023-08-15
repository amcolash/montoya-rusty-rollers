import { ref, remove } from 'firebase/database';
import React, { useState } from 'react';
import { FaFileImage } from 'react-icons/fa';

import { useDb } from '../../hooks/useDb';
import { File } from '../../hooks/useFileList';
import { Meta, getEditedImageId, metadataPath } from '../../hooks/useImageMeta';
import { database } from '../../util/firebase';
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

  const reference = ref(database, metadataPath);
  const [val, loading, error, setVal, saving] = useDb<{ [key: string]: Meta }>(reference);

  const editingPath = getEditedImageId(editing?.path || '');

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
          initialMeta={val && val[editingPath]}
          setMeta={(meta?: Meta) => {
            if (meta) {
              setVal({ ...val, [editingPath]: meta });
            } else {
              const dbRef = ref(database, `${metadataPath}/${editingPath}`);
              remove(dbRef);
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
            imageMeta={val}
          />
        </>
      )}
    </Dialog>
  );
}
