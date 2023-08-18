import { lazy } from 'react';

import { lightboxLoading } from '../util/globalState';

export const AdminLazy = lazy(() => import('./admin/Admin').then((module) => ({ default: module.Admin })));
export const AdminNavLazy = lazy(() => import('./admin/AdminNav').then((module) => ({ default: module.AdminNav })));
export const ContentEditableLazy = lazy(() =>
  import('react-contenteditable').then((module) => ({ default: module.default }))
);
export const FilePickerLazy = lazy(() =>
  import('./admin/FilePicker').then((module) => ({ default: module.FilePicker }))
);

// Set the global loading state to show loading truck animation while this large dependency loads
export const LightboxLazy = lazy(() => {
  lightboxLoading.set(true);

  return Promise.all([import('yet-another-react-lightbox'), import('yet-another-react-lightbox/styles.css')]).then(
    (modules) => {
      lightboxLoading.set(false);
      return { default: modules[0].Lightbox };
    }
  );
});
