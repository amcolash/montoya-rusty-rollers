import { DatabaseReference, remove, set } from 'firebase/database';
import { useCallback, useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';

export function useDb<T>(ref: DatabaseReference): [T | undefined, boolean, Error | undefined, (val: T) => void, boolean] {
  const [val, loading, error] = useObjectVal<T>(ref, {});
  const [saving, setSaving] = useState(false);

  const setVal = useCallback(
    async (val: T) => {
      setSaving(true);

      if (val) await set(ref, val);
      else await remove(ref);

      setSaving(false);
    },
    [ref]
  );

  return [val, loading, error, setVal, saving];
}
