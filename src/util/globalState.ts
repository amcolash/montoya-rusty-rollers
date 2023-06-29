import { DatabaseReference } from 'firebase/database';
import { createGlobalState } from 'react-global-hooks';

interface FilePickerState {
  ref: DatabaseReference;
  multi: boolean;
}

export enum EditState {
  None,
  Saving,
  Error,
}

export const filePickerState = createGlobalState<FilePickerState | undefined>(undefined);
export const headerHeight = createGlobalState<number | undefined>(undefined);
export const editingState = createGlobalState<EditState>(EditState.None);
