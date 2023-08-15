import { ref } from 'firebase/database';
import React, { CSSProperties, Suspense, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaFileImage, FaTimes } from 'react-icons/fa';
import { media, style } from 'typestyle';

import { useDb } from '../../hooks/useDb';
import { useImageMeta } from '../../hooks/useImageMeta';
import { useLocation } from '../../hooks/useLocation';
import { useProgressiveImage } from '../../hooks/useProgressiveImage';
import { database } from '../../util/firebase';
import { filePickerState } from '../../util/globalState';
import { Size, getImageUrl } from '../../util/imageUrl';
import { mobileBreakpoint } from '../../util/styles';
import { IconButton } from '../IconButton';
import { LightboxLazy } from '../LazyComponents';

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

export interface ImageData {
  url: string;
  itemPath: string;
  thumbnail?: string;
}

interface EditableImageProps {
  id: ImageId;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  multi?: boolean;
  readOnly?: boolean;
  background?: boolean;
  imageClassName?: string;
}

export function EditableImage(props: EditableImageProps) {
  const { adminMode } = useLocation();

  const [filePickerReference, setFilePickerReference] = filePickerState.use();

  const reference = ref(database, `content/images/${props.id}`);
  const [val, loading, error, setVal, saving] = useDb<ImageData[]>(reference);

  const { getEditImageUrl } = useImageMeta();

  const [index, setIndex] = useState(-1);

  const tempImages = val?.map((value) =>
    getEditImageUrl(value.itemPath, getImageUrl(value.itemPath, Size.Placeholder, true))
  );
  const loadedImages = val?.map((value) =>
    useProgressiveImage(getEditImageUrl(value.itemPath, props.multi ? value.thumbnail! : value.url))
  );

  return (
    <div style={{ position: 'relative', minWidth: '', minHeight: 50, ...props.style }}>
      {adminMode && !props.readOnly && (
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
          <IconButton
            icon={<FaFileImage />}
            onClick={() => setFilePickerReference({ ref: reference, multi: props.multi === true })}
          >
            {props.multi ? 'Choose Multiple Images' : props.background ? 'Choose Background' : 'Choose Image'}
          </IconButton>
          {!props.multi && val && import.meta.env.DEV && (
            <div style={{ marginTop: '0.5rem' }}>
              <select
                onChange={(e) => {
                  const itemPath = val[0].itemPath;
                  const { size, webp } = JSON.parse(e.target.value);

                  setVal([
                    {
                      url: getImageUrl(itemPath, size, webp),
                      itemPath,
                    },
                  ]);
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
          className={props.imageClassName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            backgroundImage: `url(${loadedImages![0] || tempImages![0]})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            filter: `blur(${loadedImages![0] ? 0 : 16}px)`,
            transition: 'filter 0.35s',
            ...props.imageStyle,
          }}
        />
      )}
      {val && props.multi && val.length > 0 && (
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
          {val.map((value, i: number) => (
            <div key={value.url} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                onClick={() => setIndex(i)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 0 }}
              >
                <img
                  className={thumbnailStyle}
                  // src={getEditImageUrl(value.itemPath, value.thumbnail!)}
                  src={loadedImages![i] || tempImages![i]}
                  style={{
                    ...props.imageStyle,
                    filter: `blur(${loadedImages![i] ? 0 : 16}px)`,
                    transition: 'filter 0.35s',
                  }}
                  loading="lazy"
                />
              </button>
              {adminMode && (
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <IconButton
                    icon={<FaChevronLeft />}
                    disabled={i === 0}
                    onClick={() => {
                      const arr = structuredClone(val);

                      const temp = arr[i];
                      arr[i] = arr[i - 1];
                      arr[i - 1] = temp;

                      setVal(arr);
                    }}
                  />
                  <IconButton
                    icon={<FaChevronRight />}
                    disabled={i === val.length - 1}
                    onClick={() => {
                      const arr = structuredClone(val);

                      const temp = arr[i];
                      arr[i] = arr[i + 1];
                      arr[i + 1] = temp;

                      setVal(arr);
                    }}
                  />
                  <IconButton
                    icon={<FaTimes />}
                    buttonType="destructive"
                    onClick={() => {
                      const arr = structuredClone(val);

                      arr.splice(i, 1);

                      setVal(arr);
                    }}
                  />
                </div>
              )}
            </div>
          ))}

          {index >= 0 && (
            <Suspense>
              <LightboxLazy
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                slides={val.map((data) => {
                  return { src: getEditImageUrl(data.itemPath, data.url) };
                })}
                controller={{ closeOnBackdropClick: true }}
              />
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
}
