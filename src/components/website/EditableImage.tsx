import { ref } from 'firebase/database';
import React, { CSSProperties, useState } from 'react';
import { FaFileImage } from 'react-icons/fa';

import { IconButton } from '../IconButton';
import { useDb } from '../../hooks/useDb';
import { database } from '../../util/firebase';
import { filePickerState } from '../../util/globalState';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useLocation } from '../../hooks/useLocation';
import { getImageUrl } from '../../hooks/useFileList';

export enum ImageId {
  header = 'header',
  services = 'services',
  work = 'work',
  about = 'about',
  aboutCert = 'aboutCert',
  aboutTruck = 'aboutTruck',
}

interface EditableImageProps {
  id: ImageId;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  multi?: boolean;
  readOnly?: boolean;
}

export function EditableImage(props: EditableImageProps) {
  const { adminMode } = useLocation();

  const [filePickerReference, setFilePickerReference] = filePickerState.use();

  const reference = ref(database, `content/images/${props.id}`);
  const [val, loading, error, setVal, saving] = useDb<string>(reference);

  const [index, setIndex] = useState(-1);

  return (
    <div style={{ position: 'relative', minWidth: 225, minHeight: 50, ...props.style }}>
      {adminMode && !props.readOnly && (
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 9 }}>
          <IconButton icon={<FaFileImage />} onClick={() => setFilePickerReference({ ref: reference, multi: props.multi === true })}>
            {props.multi ? 'Choose Multiple Photos' : 'Choose Photo'}
          </IconButton>
          {!props.multi && val && (
            <div>
              <select
                onChange={(e) => {
                  const itemPath = JSON.parse(val).itemPath;
                  const { size, webp } = JSON.parse(e.target.value);

                  setVal(
                    JSON.stringify({
                      url: getImageUrl(itemPath, size, webp),
                      itemPath,
                    })
                  );
                }}
              >
                <option value="" disabled selected>
                  Change Size
                </option>
                <optgroup label="---original---"></optgroup>
                {['', '_200x200', '_400x400', '_1000x1000', '_2000x2000'].map((size) => (
                  <option value={JSON.stringify({ size, webp: false })} key={size}>
                    {size || 'Original'}
                  </option>
                ))}

                <optgroup label="----webp----"></optgroup>
                {['_200x200', '_400x400', '_1000x1000', '_2000x2000'].map((size) => (
                  <option value={JSON.stringify({ size, webp: true })} key={size}>
                    {size || 'Original'}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
      {val && !props.multi && (
        <img src={JSON.parse(val).url} style={{ width: '100%', height: '100%', objectFit: 'cover', ...props.imageStyle }} />
      )}
      {val && props.multi && JSON.parse(val).length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
            border: adminMode ? '3px solid orange' : undefined,
          }}
        >
          {JSON.parse(val).map((value: { url: string; thumbnail: string }, i: number) => (
            <button
              onClick={() => setIndex(i)}
              key={value.url}
              style={{ background: 'none', border: 'none', padding: '0.5rem', cursor: 'pointer' }}
            >
              <img src={value.thumbnail} style={{ height: '14rem', objectFit: 'cover', borderRadius: '0.25rem', ...props.imageStyle }} />
            </button>
          ))}

          <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={JSON.parse(val).map((data: { url: string; thumbnail: string; itemPath: string }) => {
              return { src: data.url };
            })}
            controller={{ closeOnBackdropClick: true }}
          />
        </div>
      )}
    </div>
  );
}
