import { StorageReference, getStorage, listAll, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';

import { app } from '../util/firebase';
import { Size, getImageUrl } from '../util/imageUrl';

export interface File {
  name: string;
  path: string;
  url: string;
  thumbnail: string;
  ref: StorageReference;
}

export function useFileList(path: string, refreshCounter: number): [File[], boolean] {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  const storage = getStorage(app);
  const storageRef = ref(storage, path);
  useEffect(() => {
    setLoading(true);

    listAll(storageRef).then((result) => {
      const urls: File[] = [];

      for (const item of result.items) {
        if (
          item.name.includes('200x200') ||
          item.name.includes('400x400') ||
          item.name.includes('1000x1000') ||
          item.name.includes('2000x2000')
        )
          continue;

        const url = getImageUrl(item.fullPath, Size.Large, true);
        const thumbnail = getImageUrl(item.fullPath, Size.Medium, true);

        urls.push({ name: item.name, path: item.fullPath, url, thumbnail, ref: item });
      }

      setFiles(urls);
      setLoading(false);
    });
  }, [refreshCounter]);

  return [files, loading];
}

export function getImageRefs(item: StorageReference): StorageReference[] {
  if (item.fullPath.includes('.svg')) return [item];

  const storage = getStorage(app);

  return [
    item,

    ref(storage, getImageUrl(item.fullPath, Size.Thumbnail)),
    ref(storage, getImageUrl(item.fullPath, Size.Thumbnail, true)),

    ref(storage, getImageUrl(item.fullPath, Size.Medium)),
    ref(storage, getImageUrl(item.fullPath, Size.Medium, true)),

    ref(storage, getImageUrl(item.fullPath, Size.Large)),
    ref(storage, getImageUrl(item.fullPath, Size.Large, true)),

    ref(storage, getImageUrl(item.fullPath, Size.ExtraLarge)),
    ref(storage, getImageUrl(item.fullPath, Size.ExtraLarge, true)),
  ];
}
