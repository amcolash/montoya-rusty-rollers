import { deleteObject } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { FaFileDownload, FaRegTrashAlt, FaSave } from 'react-icons/fa';
import { style } from 'typestyle';

import { useDb } from '../../hooks/useDb';
import { Size, getImageRefs, getImageUrl, useFileList } from '../../hooks/useFileList';
import { filePickerState } from '../../util/globalState';
import { IconButton } from '../IconButton';

const imageButton = style({
  width: '10rem',
  height: '10rem',
  padding: '0.25rem',
  marginBottom: '0.5rem',
  background: 'transparent',
  border: '1px solid',
  borderRadius: '0.5rem',

  $nest: {
    '&:hover': {
      background: 'lightgrey',
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
  setReloadCounter: (value: number) => void;
}

export function ImageGrid(props: ImageGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const [images, loading] = useFileList('images/', props.reloadCounter);
  const [filePickerReference, setFilePickerReference] = filePickerState.use();
  const [multiDirty, setMultiDirty] = useState(false);

  if (!filePickerReference) return null;

  const [val, loadingDb, error, setVal, saving] = useDb<string>(filePickerReference.ref);

  const [selectedImages, setSelectedImages] = useState<{ url: string; thumbnail: string; itemPath: string }[]>([]);

  useEffect(() => {
    if (!val || !filePickerReference.multi) {
      setSelectedImages([]);
      return;
    }

    try {
      const parsed = JSON.parse(val || '') as { url: string; thumbnail: string; itemPath: string }[];
      setSelectedImages(parsed);
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
            setVal(JSON.stringify(selectedImages));
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
          padding: '0.75rem',
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
                      setVal(JSON.stringify({ url: getImageUrl(i.path, Size.Large, true), itemPath: i.ref.fullPath }));
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
                          if (e.target.checked) {
                            return [
                              ...prev,
                              {
                                url: getImageUrl(i.path, Size.Large, true),
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
                    src={i.thumbnail}
                    loading="lazy"
                    onError={(e) =>
                      setTimeout(() => {
                        e.target.src = '';
                        e.target.src = i.thumbnail;
                      }, 1500)
                    }
                  />
                </button>

                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <IconButton
                    icon={<FaFileDownload />}
                    onClick={() => window.open(i.url, '_blank')}
                    style={{ width: '100%', padding: '0.25rem' }}
                    title="Download Image"
                  />

                  <IconButton
                    icon={<FaRegTrashAlt />}
                    buttonType="destructive"
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this image?')) {
                        const refs = getImageRefs(i.ref);
                        await Promise.all(refs.map((r) => deleteObject(r)));

                        props.setReloadCounter(props.reloadCounter + 1);
                      }
                    }}
                    style={{ width: '100%', padding: '0.25rem' }}
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
