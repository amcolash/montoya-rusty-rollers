import { DatabaseReference, remove, set } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';

export const loadingList: string[] = [];

export function useDb<T>(ref: DatabaseReference): [T | undefined, boolean, Error | undefined, (val: T) => Promise<void>, boolean] {
  const [val, loading, error] = useObjectVal<T>(ref, {});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loading) loadingList.push(ref.toString());
    else loadingList.splice(loadingList.indexOf(ref.toString()), 1);
  }, [loading]);

  const setVal = useCallback(
    async (newVal: T) => {
      if (newVal === val) return;

      setSaving(true);

      if (newVal) await set(ref, newVal);
      else await remove(ref);

      setSaving(false);
    },
    [val, ref]
  );

  return [val, loading, error, setVal, saving];
}
