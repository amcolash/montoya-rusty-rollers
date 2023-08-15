export const bucket = 'montoya-rusty-rollers.appspot.com';

export enum Size {
  Original = '',
  Thumbnail = '_200x200',
  Medium = '_400x400',
  Large = '_1000x1000',
  ExtraLarge = '_2000x2000',
}

export function getImageUrl(itemPath: string, size: string, webp?: boolean): string {
  if (!itemPath.includes('.svg')) {
    let lastDot = itemPath.lastIndexOf('.');

    if (size === Size.Thumbnail) itemPath = itemPath.slice(0, lastDot) + Size.Thumbnail + itemPath.slice(lastDot);
    if (size === Size.Medium) itemPath = itemPath.slice(0, lastDot) + Size.Medium + itemPath.slice(lastDot);
    if (size === Size.Large) itemPath = itemPath.slice(0, lastDot) + Size.Large + itemPath.slice(lastDot);
    if (size === Size.ExtraLarge) itemPath = itemPath.slice(0, lastDot) + Size.ExtraLarge + itemPath.slice(lastDot);

    lastDot = itemPath.lastIndexOf('.');
    if (webp) itemPath = itemPath.slice(0, lastDot) + '.webp';
  }

  const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(itemPath)}?alt=media`;
  return url;
}
