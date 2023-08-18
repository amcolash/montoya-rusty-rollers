import { useCallback, useEffect, useRef, useState } from 'react';

// From https://stackoverflow.com/a/60458593/2303432
export function useProgressiveImage(temp: string, large: string) {
  const ref = useRef<HTMLImageElement | HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      threshold: 0.01,
      rootMargin: Math.max(window.innerHeight, window.innerWidth) * 1.5 + 'px',
    });

    if (ref.current && !loaded) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, loaded]);

  const onIntersection = useCallback(
    (entries) => {
      if (!entries[0].isIntersecting || loaded) return;

      const img = new Image();
      img.src = large;
      img.onload = () => setLoaded(true);
    },
    [large, loaded]
  );

  return { ref, temp, large, loaded };
}
