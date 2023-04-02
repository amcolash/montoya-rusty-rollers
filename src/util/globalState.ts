import { DatabaseReference } from '@firebase/database';
import { createGlobalState } from 'react-global-hooks';

export const filePickerState = createGlobalState<DatabaseReference | undefined>(undefined);
