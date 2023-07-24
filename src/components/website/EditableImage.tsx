import { ref } from 'firebase/database';
import React, { CSSProperties, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaFileImage, FaTimes } from 'react-icons/fa';
import { media, style } from 'typestyle';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

import { useDb } from '../../hooks/useDb';
import { getImageUrl } from '../../hooks/useFileList';
import { useLocation } from '../../hooks/useLocation';
import { database } from '../../util/firebase';
import { filePickerState } from '../../util/globalState';
import { mobileBreakpoint } from '../../util/styles';
import { IconButton } from '../IconButton';

const thumbnailStyle = style(
  {
    width: '100%',
    height: '14rem',
    objectFit: 'cover',
    borderRadius: '0.35rem',
  },
  media({ maxWidth: mobileBreakpoint }, { width: 'min(9rem, 37vw)', height: 'min(9rem, 37vw)' })
);

export enum ImageId {
  header = 'header',
  services = 'services',
  work = 'work',
  workLogo = 'workLogo',
  workGrid = 'workGrid',
  about = 'about',
  aboutCert = 'aboutCert',
  aboutTruck = 'aboutTruck',
  contact = 'contact',
}

interface EditableImageProps {
  id: ImageId;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  multi?: boolean;
  readOnly?: boolean;
  background?: boolean;
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
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
          <IconButton
            icon={<FaFileImage />}
            onClick={() => setFilePickerReference({ ref: reference, multi: props.multi === true })}
          >
            {props.multi ? 'Choose Multiple Photos' : props.background ? 'Choose Background' : 'Choose Photo'}
          </IconButton>
          {!props.multi && val && import.meta.env.DEV && (
            <div style={{ marginTop: '0.5rem' }}>
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
        <div
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundImage: `url(${JSON.parse(val).url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            ...props.imageStyle,
          }}
        />
      )}
      {val && props.multi && JSON.parse(val).length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
            border: adminMode ? '3px solid orange' : undefined,
            padding: adminMode ? '1rem' : undefined,
            paddingTop: adminMode ? '4rem' : undefined,
          }}
        >
          {JSON.parse(val).map((value: { url: string; thumbnail: string }, i: number) => (
            <div key={value.url} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                onClick={() => setIndex(i)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}
              >
                <img className={thumbnailStyle} src={value.thumbnail} style={props.imageStyle} />
              </button>
              {adminMode && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <IconButton
                    icon={<FaChevronLeft />}
                    disabled={i === 0}
                    onClick={() => {
                      const arr = JSON.parse(val);
                      const temp = arr[i];
                      arr[i] = arr[i - 1];
                      arr[i - 1] = temp;
                      setVal(JSON.stringify(arr));
                    }}
                  />
                  <IconButton
                    icon={<FaChevronRight />}
                    disabled={i === JSON.parse(val).length - 1}
                    onClick={() => {
                      const arr = JSON.parse(val);
                      const temp = arr[i];
                      arr[i] = arr[i + 1];
                      arr[i + 1] = temp;
                      setVal(JSON.stringify(arr));
                    }}
                  />
                  <IconButton
                    icon={<FaTimes />}
                    buttonType="destructive"
                    onClick={() => {
                      const arr = JSON.parse(val);
                      arr.splice(i, 1);
                      setVal(JSON.stringify(arr));
                    }}
                  />
                </div>
              )}
            </div>
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
