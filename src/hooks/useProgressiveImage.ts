import { useEffect, useState } from 'react';

// From https://stackoverflow.com/a/60458593/2303432
export function useProgressiveImage(src: string) {
  const [sourceLoaded, setSourceLoaded] = useState<string>();

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
}
