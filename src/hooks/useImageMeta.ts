import { useCallback } from 'react';
import { type Crop } from 'react-image-crop';

import { useDb } from './useDb';

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

export const metadataPath = 'metadata/images';

export function getEditedImageId(path: string) {
  return path.replace(/[./]/g, '_') || '';
}

export function useImageMeta() {
  const [val, loading, error, setVal, saving] = useDb<{ [key: string]: Meta }>(metadataPath);

  const getEditImageUrl = useCallback(
    (itemPath: string, url: string) => {
      const path = getEditedImageId(itemPath);

      if (val && val[path] !== undefined) return url.replace('images%2F', 'images%2Fcropped%2F');
      return url;
    },
    [val]
  );

  return { meta: val, getEditImageUrl };
}
