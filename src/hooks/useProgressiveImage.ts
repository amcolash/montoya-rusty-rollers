import { useCallback, useEffect, useRef, useState } from 'react';

// From https://stackoverflow.com/a/60458593/2303432
export function useProgressiveImage(src: string) {
  const ref = useRef<HTMLImageElement | HTMLDivElement>();
  const [sourceLoaded, setSourceLoaded] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      threshold: 0.01,
      rootMargin: Math.max(window.innerHeight, window.innerWidth) * 1.5 + 'px',
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, sourceLoaded]);

  const onIntersection = useCallback(
    (entries) => {
      if (!entries[0].isIntersecting || sourceLoaded) return;

      const img = new Image();
      img.src = src;
      img.onload = () => setSourceLoaded(src);
    },
    [src, sourceLoaded]
  );

  return { ref, loaded: sourceLoaded };
}
