import loadImage from 'blueimp-load-image';
import { getStorage, ref } from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { useUploadFile } from 'react-firebase-hooks/storage';
import { FaSave, FaTimes } from 'react-icons/fa';
import { FaRotateLeft, FaRotateRight } from 'react-icons/fa6';
import ReactCrop, { type Crop, convertToPixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { cssRule } from 'typestyle';

import { File } from '../../hooks/useFileList';
import { app } from '../../util/firebase';
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

export function getEditedImageId(path: string) {
  return path.replace(/[./]/g, '_') || '';
}

const defaultCrop: Crop = { unit: '%', x: 0, y: 0, width: 100, height: 100 };

interface CropperProps {
  file: File;
  initialMeta?: Meta;
  setMeta: (meta?: Meta) => void;
}

export function Cropper(props: CropperProps) {
  const storage = getStorage(app);

  const [crop, setCrop] = useState<Crop>(props.initialMeta?.crop || defaultCrop);
  const [rotation, setRotation] = useState<number | undefined>(
    props.initialMeta ? props.initialMeta.rotation : undefined
  );
  const [initialLoad, setInitialLoad] = useState(true);
  const [img, setImg] = useState<string>();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [uploadFile, uploading, snapshot, error] = useUploadFile();

  const src = props.file.url;

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
          <img src={img} style={{ maxHeight: 400, maxWidth: 'min(400px, 100%)' }} />
        </ReactCrop>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
        <IconButton icon={<FaRotateLeft />} onClick={() => setRotation(((((rotation || 0) - 1) % 4) + 4) % 4)} />
        <IconButton icon={<FaRotateRight />} onClick={() => setRotation(((rotation || 0) + 1) % 4)} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <IconButton
          icon={<FaSave />}
          buttonType="success"
          onClick={async () => {
            if (crop || rotation) props.setMeta({ crop, rotation: rotation || 0 });
            else props.setMeta(undefined);

            if (!canvasRef.current || !img) return;

            const croppedImage = await generateImage(crop, canvasRef.current, img);
            if (croppedImage) {
              const storageRef = ref(storage, 'images/cropped/' + props.file.name);
              try {
                await uploadFile(storageRef, croppedImage, { contentType: 'image/jpeg' });
              } catch (err) {
                console.error(err);
              }
            }
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

async function generateImage(crop: Crop, canvas: HTMLCanvasElement, img: string): Promise<Blob | null> {
  const image = new Image();
  image.src = img || '';

  const pixelCrop = convertToPixelCrop(crop, image.width, image.height);
  const { x, y, width, height } = pixelCrop;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx?.drawImage(image, x, y, width, height, 0, 0, width, height);

  return new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
}
