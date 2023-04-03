import { getDownloadURL, listAll, ref, StorageReference } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { storage } from '../util/firebase';

interface File {
  name: string;
  path: string;
  url: string;
  ref: StorageReference;
}

export function useFileList(path: string, refreshCounter: number): [File[], boolean] {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  const storageRef = ref(storage, path);
  useEffect(() => {
    setLoading(true);

    listAll(storageRef).then(async (result) => {
      const urls = [];

      for (const item of result.items) {
        const existing = files.find((f) => f.path === item.fullPath);
        if (existing) {
          urls.push(existing);
        } else {
          const url = await getDownloadURL(item);
          urls.push({ name: item.name, path: item.fullPath, url, ref: item });
        }
      }

      setFiles(urls);
      setLoading(false);
    });
  }, [refreshCounter]);

  return [files, loading];
}
