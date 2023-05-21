import { DatabaseReference, remove, set } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import { EditState, editingState } from '../util/globalState';

export const loadingList: string[] = [];

export function useDb<T>(ref: DatabaseReference): [T | undefined, boolean, Error | undefined, (val: T) => Promise<void>, boolean] {
  const [val, loading, error] = useObjectVal<T>(ref, {});
  const [saving, setSaving] = useState(false);
  const [editState, setEditState] = editingState.use();

  useEffect(() => {
    if (loading) loadingList.push(ref.toString());
    else loadingList.splice(loadingList.indexOf(ref.toString()), 1);
  }, [loading]);

  useEffect(() => {
    if (error) {
      setEditState(EditState.Error);
    }
  }, [error]);

  const setVal = useCallback(
    async (newVal: T | undefined) => {
      if (newVal === val) return;

      const startTime = Date.now();
      setSaving(true);
      setEditState(EditState.Saving);

      if (newVal) await set(ref, newVal);
      else await remove(ref);

      // Make saving take at least 500ms to show saving in the UI temporarily
      const difference = Date.now() - startTime;
      setTimeout(
        () => {
          setSaving(false);
          setEditState(EditState.None);
        },
        difference < 500 ? 500 - difference : 0
      );
    },
    [val, ref]
  );

  return [val, loading, error, setVal, saving];
}
