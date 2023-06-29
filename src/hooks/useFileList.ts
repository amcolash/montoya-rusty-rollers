import { getStorage, listAll, ref, StorageReference } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { app } from '../util/firebase';

interface File {
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
        if (item.name.includes('200x200') || item.name.includes('400x400') || item.name.includes('1000x1000')) continue;

        const url = getImageUrl(item, Size.Original);
        const thumbnail = getImageUrl(item, Size.Thumbnail);

        urls.push({ name: item.name, path: item.fullPath, url, thumbnail, ref: item });
      }

      setFiles(urls);
      setLoading(false);
    });
  }, [refreshCounter]);

  return [files, loading];
}

enum Size {
  Original,
  Thumbnail = '_200x200',
  Medium = '_400x400',
  Large = '_1000x1000',
}

function getImageUrl(item: StorageReference, size: Size): string {
  const url = `https://firebasestorage.googleapis.com/v0/b/${item.bucket}/o/${encodeURIComponent(item.fullPath)}?alt=media`;
  const lastDot = url.lastIndexOf('.');

  if (!url.includes('.svg')) {
    if (size === Size.Thumbnail) return url.slice(0, lastDot) + Size.Thumbnail + url.slice(lastDot);
    if (size === Size.Medium) return url.slice(0, lastDot) + Size.Medium + url.slice(lastDot);
    if (size === Size.Large) return url.slice(0, lastDot) + Size.Large + url.slice(lastDot);
  }

  return url;
}
