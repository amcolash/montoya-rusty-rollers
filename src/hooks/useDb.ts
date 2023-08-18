import { useContext, useEffect, useState } from 'react';

import { DBContext } from '../components/website/Website';
import { useLocation } from './useLocation';

export const loadingList: string[] = [];

// Load the db implementation
export function useDbLoader() {
  const { adminMode } = useLocation();
  const [useDbFn, setUseDbFn] =
    useState<<T>(ref: string) => [T | undefined, boolean, Error | undefined, (val: T) => Promise<void>, boolean]>();

  const loadingKey = 'DbLoader';

  useEffect(() => {
    if (!loadingList.includes(loadingKey)) loadingList.push(loadingKey);

    if (adminMode) {
      import('./useDynamicDb').then(({ useDynamicDb }) => {
        setUseDbFn(() => useDynamicDb);
        loadingList.splice(loadingList.indexOf(loadingKey), 1);
      });
    } else {
      import('./useStaticDb').then(({ useStaticDb, updateData }) => {
        setUseDbFn(() => useStaticDb);
        loadingList.splice(loadingList.indexOf(loadingKey), 1);

        updateData();
      });
    }
  }, []);

  return useDbFn;
}

// Actually provide loaded db function
export function useDb<T>(ref: string): [T | undefined, boolean, Error | undefined, (val: T) => Promise<void>, boolean] {
  const dbFn = useContext(DBContext);
  return dbFn(ref);
}
