import loadImage from 'blueimp-load-image';
import React, { CSSProperties, useEffect, useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { FaRotateLeft, FaRotateRight } from 'react-icons/fa6';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { cssRule } from 'typestyle';

import { File } from '../../hooks/useFileList';
import { IconButton } from '../IconButton';

cssRule('.ReactCrop__crop-selection', {
  animationPlayState: 'paused !important',
});

export type Meta = {
  crop: Crop;
  rotation: number;
};

// This enum is only used when loading the image and is not the rotation value saved
export enum Orientation {
  DEG_0 = 1,
  DEG_90 = 6,
  DEG_180 = 3,
  DEG_270 = 8,
}

export function getImageTransform(image: File, imageMeta?: { [key: string]: Meta }): CSSProperties {
  const imgPath = image.path.replace(/[./]/g, '_');
  const meta = imageMeta?.[imgPath];

  if (!imageMeta || !meta) return {};

  const rotation = meta.rotation;

  return { transform: `${rotation ? `rotate(${rotation * 90}deg)` : 'unset'}` };
}

const defaultCrop: Crop = { unit: '%', x: 0, y: 0, width: 100, height: 100 };

interface CropperProps {
  file: File;
  initialMeta?: Meta;
  setMeta: (meta?: Meta) => void;
}

export function Cropper(props: CropperProps) {
  const [crop, setCrop] = useState<Crop>(props.initialMeta?.crop || defaultCrop);
  const [rotation, setRotation] = useState<number | undefined>(
    props.initialMeta ? props.initialMeta.rotation : undefined
  );
  const [initialLoad, setInitialLoad] = useState(true);
  const [img, setImg] = useState<string>();

  const src = props.file.thumbnail;

  useEffect(() => {
    loadImage(
      src,
      (img) => {
        const base64data = (img as HTMLCanvasElement).toDataURL(`image/jpeg`);
        setImg(base64data);
        if (!initialLoad) setCrop(defaultCrop);
        setInitialLoad(false);
      },
      {
        orientation:
          rotation === undefined ? true : Number.parseInt(Object.values(Orientation)[rotation + 4] as string),
        canvas: true,
        crossOrigin: 'anonymous',
      }
    );
  }, [src, rotation || 0]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      {img && (
        <ReactCrop crop={crop} onChange={(pixelCrop, percentageCrop) => setCrop(percentageCrop)} keepSelection={true}>
          <img src={img} style={{ maxHeight: 400, maxWidth: 400 }} />
        </ReactCrop>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
        <IconButton icon={<FaRotateLeft />} onClick={() => setRotation(((((rotation || 0) - 1) % 4) + 4) % 4)} />
        <IconButton icon={<FaRotateRight />} onClick={() => setRotation(((rotation || 0) + 1) % 4)} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
        <IconButton
          icon={<FaSave />}
          buttonType="success"
          style={{ marginLeft: '1rem' }}
          onClick={() => {
            if (crop && rotation) props.setMeta({ crop, rotation });
            else props.setMeta(undefined);
          }}
        >
          Save
        </IconButton>

        <IconButton icon={<FaTimes />} buttonType="destructive" onClick={() => props.setMeta(undefined)}>
          Cancel
        </IconButton>
      </div>
    </div>
  );
}
