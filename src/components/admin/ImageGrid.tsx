import React from 'react';
import { IconButton } from '../IconButton';
import { FaFileDownload, FaRegTrashAlt, FaSave } from 'react-icons/fa';
import { useFileList } from '../../hooks/useFileList';
import { deleteObject } from 'firebase/storage';
import { style } from 'typestyle';
import { filePickerState } from '../../util/globalState';
import { set } from 'firebase/database';

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
  const [images, loading] = useFileList('images/', props.reloadCounter);
  const [filePickerReference, setFilePickerReference] = filePickerState.use();

  const gridRef = React.useRef<HTMLDivElement>(null);

  if (!filePickerReference) return null;

  return (
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
      {loading && <div>Loading...</div>}
      {!loading && images.length === 0 && <div>No Images</div>}
      {!loading &&
        images.map((i) => {
          const checkboxRef = React.useRef<HTMLInputElement>(null);

          return (
            <div key={i.url} style={{ display: 'flex', flexDirection: 'column' }}>
              <button
                className={imageButton}
                onClick={async () => {
                  if (filePickerReference.multi && checkboxRef.current) {
                    checkboxRef.current.checked = !checkboxRef.current.checked;
                  } else {
                    await set(filePickerReference.ref, i.url);
                    setFilePickerReference(undefined);
                  }
                }}
                style={{ position: 'relative' }}
              >
                {filePickerReference.multi && (
                  <input
                    type="checkbox"
                    ref={checkboxRef}
                    onClick={(e) => e.stopPropagation()}
                    style={{ position: 'absolute', top: '0.25rem', right: '0.25rem' }}
                    data-url={i.url}
                  />
                )}
                <img src={i.url} />
              </button>

              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <IconButton
                  icon={<FaFileDownload />}
                  onClick={() => window.open(i.url, '_blank')}
                  style={{ width: '100%', padding: '0.25rem' }}
                />

                <IconButton
                  icon={<FaRegTrashAlt />}
                  buttonType="destructive"
                  onClick={async () => {
                    if (confirm('Are you sure you want to delete this image?')) {
                      await deleteObject(i.ref);
                      props.setReloadCounter(props.reloadCounter + 1);
                    }
                  }}
                  style={{ width: '100%', padding: '0.25rem' }}
                />
              </div>
            </div>
          );
        })}

      {filePickerReference.multi && (
        <IconButton
          icon={<FaSave />}
          onClick={() => {
            if (gridRef.current) {
              const checkboxes = gridRef.current.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
              const images = Array.from(checkboxes)
                .filter((c) => c.checked)
                .map((c) => c.getAttribute('data-url'));

              console.log(images);
            }
          }}
        >
          Save
        </IconButton>
      )}
    </div>
  );
}
