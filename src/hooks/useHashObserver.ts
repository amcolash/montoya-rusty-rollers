// From https://nathan.gs/2022/12/31/single-page-website-changing-url-hash-based-on-position-in-page/
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const location = window.location.toString().split('#')[0];
        const oldHash = window.location.hash;
        const hash = '#' + entry.target.id;

        if (hash != oldHash) {
          history.replaceState(null, '', location + hash);
        }
      }
    });
  },
  { threshold: 0.85 }
);

export function useHashObserver(ref: React.RefObject<HTMLElement>) {
  // Wait a moment before watching the element
  setTimeout(() => {
    if (ref.current) observer.observe(ref.current);
  }, 1000);

  return () => {
    if (ref.current) observer.unobserve(ref.current);
  };
}
