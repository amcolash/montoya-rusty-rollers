import { ref as dbRef, remove } from 'firebase/database';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { FaEdit, FaRegTrashAlt, FaSave } from 'react-icons/fa';
import { style } from 'typestyle';

import { useDb } from '../../hooks/useDb';
import { File, Size, getImageRefs, getImageUrl, useFileList } from '../../hooks/useFileList';
import { metadataPath, useImageMeta } from '../../hooks/useImageMeta';
import { app, database } from '../../util/firebase';
import { filePickerState } from '../../util/globalState';
import { IconButton } from '../IconButton';
import { ImageData } from '../website/EditableImage';
import { Meta, getEditedImageId } from './Cropper';

const imageButton = style({
  width: '10rem',
  height: '10rem',
  padding: '0',
  marginBottom: '0.5rem',
  background: 'transparent',
  border: '1px solid',
  borderRadius: '0.5rem',

  $nest: {
    '&:hover': {
      filter: 'brightness(0.8)',
    },
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '0.5rem',
    },
  },
});

interface ImageGridProps {
  reloadCounter: number;
  multiDirty: boolean;
  setReloadCounter: (value: number) => void;
  setMultiDirty: (value: boolean) => void;
  setEditing: (value: File | undefined) => void;
  imageMeta: { [key: string]: Meta } | undefined;
}

export function ImageGrid(props: ImageGridProps) {
  const { reloadCounter, setReloadCounter, multiDirty, setMultiDirty, setEditing } = props;

  const gridRef = useRef<HTMLDivElement>(null);

  const [images, loading] = useFileList('images/', reloadCounter);
  const [filePickerReference, setFilePickerReference] = filePickerState.use();

  if (!filePickerReference) return null;

  const [val, loadingDb, error, setVal, saving] = useDb<ImageData[]>(filePickerReference.ref);
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);

  const { meta, getEditImageUrl } = useImageMeta();
  const storage = getStorage(app);

  useEffect(() => {
    if (!val || !filePickerReference.multi) {
      setSelectedImages([]);
      return;
    }

    try {
      setSelectedImages(val);
    } catch (err) {
      console.error(err);
      setSelectedImages([]);
    }
  }, [val]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ borderBottom: '1px solid #bbb', width: '80%', margin: '0 0 1rem', textAlign: 'center' }}></div>

      {!loading && images.length > 0 && filePickerReference.multi && (
        <IconButton
          icon={<FaSave />}
          buttonType="success"
          onClick={() => {
            setVal(selectedImages);
            setFilePickerReference(undefined);
          }}
          style={{ margin: '0.75rem' }}
          disabled={!multiDirty || saving}
        >
          Save Selected Images
        </IconButton>
      )}

      <div
        ref={gridRef}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        {loading && <div>Loading Images...</div>}
        {!loading && images.length === 0 && <div>No Images Have Been Uploaded</div>}
        {!loading &&
          images.map((i) => {
            const checkboxRef = useRef<HTMLInputElement>(null);

            return (
              <div key={i.url} style={{ display: 'flex', flexDirection: 'column' }}>
                <button
                  className={imageButton}
                  onClick={(e) => {
                    if (filePickerReference.multi && checkboxRef.current) {
                      checkboxRef.current.click();
                    } else {
                      setVal([{ url: getImageUrl(i.path, Size.Large, true), itemPath: i.ref.fullPath }]);
                      setFilePickerReference(undefined);
                    }
                  }}
                  style={{ position: 'relative' }}
                  title={i.name}
                >
                  {filePickerReference.multi && (
                    <input
                      type="checkbox"
                      ref={checkboxRef}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMultiDirty(true);

                        setSelectedImages((prev) => {
                          if ((e.target as HTMLInputElement).checked) {
                            return [
                              ...prev,
                              {
                                url: i.url,
                                thumbnail: i.thumbnail,
                                itemPath: i.ref.fullPath,
                              },
                            ];
                          } else {
                            return prev.filter((p) => p.url !== i.url);
                          }
                        });
                      }}
                      // onChange={() => setMultiDirty(true)}
                      style={{ position: 'absolute', top: '0.25rem', right: '0.25rem' }}
                      data-url={i.url}
                      data-thumbnail={i.thumbnail}
                      data-item-path={i.ref.fullPath}
                      checked={selectedImages.some((s) => s.url === i.url)}
                    />
                  )}
                  <img
                    src={getEditImageUrl(i.path, i.thumbnail)}
                    loading="lazy"
                    onError={(e) =>
                      setTimeout(() => {
                        (e.target as HTMLImageElement).src = '';
                        (e.target as HTMLImageElement).src = i.thumbnail;
                      }, 1500)
                    }
                  />
                </button>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <IconButton
                    icon={<FaEdit />}
                    onClick={() => setEditing(i)}
                    style={{ padding: '0.35rem 1.25rem', height: '1.5rem' }}
                    title="Edit Image"
                  />

                  <IconButton
                    icon={<FaRegTrashAlt />}
                    buttonType="destructive"
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this image?')) {
                        const refs = getImageRefs(i.ref);

                        // Delete edited images if they exist
                        if (meta && meta[getEditedImageId(i.path)] !== undefined) {
                          refs.forEach((r) => {
                            refs.push(ref(storage, r.fullPath.replace('images/', 'images/cropped/')));
                          });

                          // Also remove metadata
                          const metaRef = dbRef(database, `${metadataPath}/${getEditedImageId(i.path)}`);
                          remove(metaRef);
                        }

                        await Promise.all(refs.map((r) => deleteObject(r)));

                        setReloadCounter(reloadCounter + 1);
                      }
                    }}
                    style={{ padding: '0.35rem 1.25rem', height: '1.5rem' }}
                    title="Delete Image"
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
