import { lazy } from 'react';

export const AdminLazy = lazy(() => import('./admin/Admin').then((module) => ({ default: module.Admin })));
export const AdminNavLazy = lazy(() => import('./admin/AdminNav').then((module) => ({ default: module.AdminNav })));
export const ContentEditableLazy = lazy(() =>
  import('react-contenteditable').then((module) => ({ default: module.default }))
);
export const FilePickerLazy = lazy(() =>
  import('./admin/FilePicker').then((module) => ({ default: module.FilePicker }))
);

export const LightboxLazy = lazy(() =>
  Promise.all([import('yet-another-react-lightbox'), import('yet-another-react-lightbox/styles.css')]).then(
    (modules) => ({ default: modules[0].Lightbox })
  )
);
