import { DatabaseReference } from '@firebase/database';
import { createGlobalState } from 'react-global-hooks';

interface FilePickerState {
  ref: DatabaseReference;
  multi: boolean;
}

export const filePickerState = createGlobalState<FilePickerState | undefined>(undefined);
export const headerHeight = createGlobalState<number | undefined>(undefined);
