import loadImage from 'blueimp-load-image';
import { ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { FaRotateLeft, FaRotateRight } from 'react-icons/fa6';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { cssRule } from 'typestyle';

import { useDb } from '../../hooks/useDb';
import { File } from '../../hooks/useFileList';
import { database } from '../../util/firebase';
import { IconButton } from '../IconButton';

cssRule('.ReactCrop__crop-selection', {
  animationPlayState: 'paused !important',
});

interface CropperProps {
  file: File;
  initialCrop?: Crop;
  setCrop: (crop: Crop | undefined) => void;
}

enum Rotation {
  DEG_0 = 1,
  DEG_90 = 6,
  DEG_180 = 3,
  DEG_270 = 8,
}

export function Cropper(props: CropperProps) {
  const [crop, setCrop] = useState<Crop>(props.initialCrop || { unit: '%', x: 0, y: 0, width: 100, height: 100 });
  const [rotation, setRotation] = useState<number | undefined>();
  const [img, setImg] = useState<string>();

  const reference = ref(database, `images/meta/${props.file.name.replace(/\.[^/.]+$/, '')}`);
  const [val, loading, error, setVal, saving] = useDb<string>(reference);

  const src = props.file.thumbnail;

  useEffect(() => {
    loadImage(
      src,
      (img) => {
        const base64data = (img as HTMLCanvasElement).toDataURL(`image/jpeg`);
        setImg(base64data);
        setCrop({ unit: '%', x: 0, y: 0, width: 100, height: 100 });
      },
      {
        orientation: rotation === undefined ? true : Number.parseInt(Object.values(Rotation)[rotation + 4] as string),
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
          onClick={() => props.setCrop(crop)}
        >
          Save
        </IconButton>

        <IconButton icon={<FaTimes />} buttonType="destructive" onClick={() => props.setCrop(undefined)}>
          Cancel
        </IconButton>
      </div>
    </div>
  );
}
