import { createGlobalState } from 'react-global-hooks';

interface FilePickerState {
  ref: string;
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
export const attemptedLogin = createGlobalState<boolean>(false);
export const lightboxLoading = createGlobalState<boolean>(false);
