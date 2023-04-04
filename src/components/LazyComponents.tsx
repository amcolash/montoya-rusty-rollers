import { lazy } from 'react';

export const AdminLazy = lazy(() => import('./admin/Admin').then((module) => ({ default: module.Admin })));
export const AdminNavLazy = lazy(() => import('./admin/AdminNav').then((module) => ({ default: module.AdminNav })));
export const FilePickerLazy = lazy(() => import('./admin/FilePicker').then((module) => ({ default: module.FilePicker })));
